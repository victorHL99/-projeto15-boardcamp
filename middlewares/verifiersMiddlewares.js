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

export async function vPostGamesMid(req,res,next){
    console.log("Passando pela middleware post games")
    const {name,image,stockTotal,categoryId,pricePerDay} = req.body;

    const schema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required().pattern(new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)).required(),
        stockTotal: Joi.number().required().greater(0).integer(),
        categoryId: Joi.number().required().integer().min(1).max(3),
        pricePerDay: Joi.number().required().greater(0).integer()
    });

    const verifySchema = schema.validate({name, image, stockTotal, categoryId, pricePerDay}).error;
    if(verifySchema){
        res.sendStatus(400);
        return;
    }

    try{
        const resultGames = await db.query('SELECT * FROM games WHERE name = $1',[name]);
        if(resultGames.rows.length > 0){
            res.sendStatus(409);
            return;
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}