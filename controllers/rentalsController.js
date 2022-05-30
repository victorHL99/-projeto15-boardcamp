import db from '../db.js';

export async function getRentals(req,res){
    console.log("Passando pelo controller get rentals");
    const filterRentalsCustomerId = req.query.customerId;
    const filterRentalGameId = req.query.gameId;

    try{
        let resultRentals;
        if(filterRentalsCustomerId !== undefined){
            resultRentals = await db.query(`
                SELECT * FROM rentals
                JOIN games 
                ON rentals."customerId" = games.id
                JOIN categories
                ON games."categoryId" = categories.id;
                WHERE rentals."customerId" LIKE '${filterRentalsCustomerId}%';`);
            return;
        } else {
            resultRentals = await db.query(`
                SELECT * FROM rentals
                JOIN games 
                ON rentals."customerId" = games.id
                JOIN categories
                ON games."categoryId" = categories.id;`)
        }

        if(filterRentalGameId !== undefined){
            resultRentals = await db.query(`
                SELECT * FROM rentals
                JOIN games 
                ON rentals."customerId" = games.id
                JOIN categories
                ON games."categoryId" = categories.id;
                WHERE games.id LIKE '${filterRentalGameId}%';`);
            return;
        } else {
            resultRentals = await db.query(`
                SELECT * FROM rentals
                JOIN games 
                ON rentals."customerId" = games.id
                JOIN categories
                ON games."categoryId" = categories.id;`)
        }
            
        


        res.send(resultRentals.rows);

    }  catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}