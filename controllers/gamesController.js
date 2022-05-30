import db from '../db.js';

export async function getGames(req,res) {
    const filterGames = req.query.name
    try{
        let resultGames;
        if(filterGames !== undefined){
            resultGames = await db.query(`
                SELECT games.*, categories.name as "categoryName" 
                FROM games 
                JOIN categories 
                ON games."categoryId" = categories.id 
                WHERE lower(games.name) LIKE '${filterGames.toLowerCase()}%';`);
        } else {
            resultGames = await db.query(`
                SELECT games.*, categories.name as "categoryName" 
                FROM games 
                JOIN categories
                ON games."categoryId" = categories.id;`);

        }
        
        res.send(resultGames.rows);
    } catch (error) {
        res.sendStatus(500);
    }

};

export async function postGames(req,res) {
    const {name,image, stockTotal ,categoryId,pricePerDay} = req.body;
    try{
        const resultGames = await db.query('INSERT INTO games (name, "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)', [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
};