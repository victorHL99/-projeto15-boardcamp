import db from '../db.js';
import dayjs from 'dayjs';

export async function getRentals(req,res){
    const filterCustomerId = req.query.customerId;
    const filterGameId = req.query.gameId;

    try {
    let resultRentals;
    if (filterCustomerId === undefined && filterGameId === undefined) {
      resultRentals = await db.query(`SELECT * FROM rentals`);
    }
    if (filterCustomerId !== undefined) {
        resultRentals = await db.query(
        `SELECT * FROM rentals WHERE rentals."customerId" = ${filterCustomerId}`
        );
    }
    if (filterGameId !== undefined) {
        resultRentals = await db.query(
        `SELECT * FROM rentals WHERE rentals."gameId" = ${filterGameId}`
        );
    }

    const rentals = resultRentals.rows;

    let completeRentals = [];
    let completeRental = null;
    let customer = null;
    let game = null;
    for (let rental of rentals) {
        const customerResult = await db.query(
        `SELECT customers.id, customers.name FROM customers WHERE id = $1`,
        [rental.customerId]
        );
        customer = customerResult.rows[0];

        const gameResult = await db.query(
            `SELECT games.id, games.name, games."categoryId", categories.name as "categoryName" 
            FROM games 
            JOIN categories ON games."categoryId" = categories.id
            WHERE games.id = $1;`,
            [rental.gameId]
        );
        game = gameResult.rows[0];

        completeRental = { ...rental, customer, game };
        completeRentals.push(completeRental);
    }

    res.send(completeRentals);
    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter as categorias!");
    }
}

export async function postRentals(req,res){
    console.log("Passando pelo controller post rentals");
    const {customerId, gameId, daysRented} = req.body;
    const dateToday = dayjs().format('YYYY-MM-DD');

    try{
        const resultCustomer = await db.query('SELECT * FROM customers WHERE id = $1',[customerId]);
        const customer = resultCustomer.rows[0];

        if(customer === undefined){
            res.sendStatus(400);
            return;
        }

        const resultGame = await db.query('SELECT * FROM games WHERE id = $1',[gameId]);
        const game = resultGame.rows[0];

        if(game === undefined){
            res.sendStatus(400);
            return;
        }

        const resultRental = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`, [gameId]);
        
        if(resultRental.rows.length >= game.stockTotal){
            res.sendStatus(400);
            return;
        }

        const originalPrice = daysRented * game.pricePerDay;

        const resultRentalInsert = await db.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, NULL, $5, NULL)`,
            [customerId, gameId, dateToday, daysRented, originalPrice]);

        res.sendStatus(201);


    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function postReturnRental(req, res){
    const {id} = req.params;
    const dateToday = dayjs().format('YYYY-MM-DD');

    try {
        const resultRental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
        const rental = resultRental.rows[0];

        if(rental === undefined){
            res.sendStatus(404);
            return;
        }

        const {rentDate, daysRented, returnDate, originalPrice} = rental;

        if(returnDate !== null){
            res.sendStatus(400);
            return;
        }

        const daysDelay = dayjs(dateToday).diff(dayjs(rentDate), 'day');

        const delayFee = 
            daysDelay > 0 ? daysDelay * (originalPrice/daysRented) : null;

        await db.query(`
            UPDATE rentals SET ("returnDate", "delayFee") = ($1, $2) WHERE id = $3`,[dateToday, delayFee, id]);

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

export async function deleteRental(req, res){
    const {id} = req.params;

    try {
        const resultRental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
        const rental = resultRental.rows[0];

        if(rental === undefined){
            res.sendStatus(404);
            return;
        }

        if(rental.returnDate !== null){
            res.sendStatus(400);
            return;
        }

        await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}