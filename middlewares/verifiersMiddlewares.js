import Joi from "joi";
import db from "../db.js";

export async function vPostCategoriesMid(req, res, next){
    console.log("Passando pela middleware post categories")
    const {name} = req.body;

    const schema = Joi.object({
        name: Joi.string().required()
    });
    
        const verifyName = schema.validate({name}).error;

    if(verifyName){
        res.sendStatus(400);
        return;
    }

    try{
        const resultCategories = await db.query('SELECT * FROM categories WHERE name = $1', [name]);
        console.log(resultCategories.rows);
        if(resultCategories.rows.length > 0){
            res.sendStatus(409);
            return;
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }


};