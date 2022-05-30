import db from '../db.js';

export async function getCategories(req,res){

    try {
        const resultCategories = await db.query('SELECT * FROM categories');
        res.send(resultCategories.rows);
    } catch (error) {
        res.sendStatus(500);
    }
};

export async function postCategories(req,res){
    const {name} = req.body;
    try{
        const resultCategories = await db.query('INSERT INTO categories (name) VALUES ($1)', [name]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }


};