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