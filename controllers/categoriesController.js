import db from '../db.js';

export async function getCategories(req,res){
    console.log("Passando pela controller get categorias");

    try {
        const resultCategories = await db.query('SELECT * FROM categories');
        res.send(resultCategories.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export async function postCategories(req,res){
    console.log("Passando pela controller post categorias");
    const {name} = req.body;
    try{
        const resultCategories = await db.query('INSERT INTO categories (name) VALUES ($1)', [name]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }


};