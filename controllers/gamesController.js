import db from '../db.js';

export async function getGames(req,res) {
    console.log("Passando pela controller get games");

    try{
        const resultGames = await db.query('SELECT * FROM games');
        res.send(resultGames.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

};

export async function postGames(req,res) {
    console.log("Passando pela controller post games");
    const {name,image, stockTotal ,categoryId,pricePerDay} = req.body;
    console.log(req.body);
    try{
        const resultGames = await db.query('INSERT INTO games (name, "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)', [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};