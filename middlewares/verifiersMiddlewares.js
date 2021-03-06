import JoiInitial from "joi";
import JoiDate from "@joi/date";
import db from "../db.js";

export async function vPostCategoriesMid(req, res, next){
    const {name} = req.body;
    const Joi = JoiInitial.extend(JoiDate);

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
        if(resultCategories.rows.length > 0){
            res.sendStatus(409);
            return;
        } else {
            next();
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

export async function vPostGamesMid(req,res,next){
    const {name,image,stockTotal,categoryId,pricePerDay} = req.body;
    const Joi = JoiInitial.extend(JoiDate);

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
        res.sendStatus(500);
    }
}

export async function vPostCustomerMid(req, res, next){
    const {name, phone, cpf, birthday} = req.body;

    const Joi = JoiInitial.extend(JoiDate);

    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required().pattern(new RegExp(/^\d{10,11}$/)),
        cpf: Joi.string().required().pattern(new RegExp(/^\d{11}$/)),
        birthday: Joi.date().format("YYYY-MM-DD").required()
    });

    const verifySchema = schema.validate({name, phone, cpf, birthday}).error;

    if(verifySchema){
        res.sendStatus(400);
        return;
    }

    try{
        const resultCustomer = await db.query('SELECT * FROM customers WHERE cpf = $1',[cpf]);
        if(resultCustomer.rows.length !== 0){
            res.sendStatus(409);
            return;
        } else {
            next();
        }
    } catch (error) {
        res.sendStatus(500);
    }

}

export async function vPutCustomerMid(req, res, next){
    const {name, phone, cpf, birthday} = req.body;

    const Joi = JoiInitial.extend(JoiDate);

    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required().pattern(new RegExp(/^\d{10,11}$/)),
        cpf: Joi.string().required().pattern(new RegExp(/^\d{11}$/)),
        birthday: Joi.date().format("YYYY-MM-DD").required()
    });

    const verifySchema = schema.validate({name, phone, cpf, birthday}).error;

    if(verifySchema){
        res.sendStatus(400);
        return;
    }

    try{
        next()
    } catch (error) {
        res.sendStatus(500);
    }

}

export async function vPostRentalsMid(req, res, next){

    const {customerId, gameId, daysRented} = req.body;
    const Joi = JoiInitial.extend(JoiDate);

    const schema = Joi.object({
        customerId: Joi.number().required().integer(),
        gameId: Joi.number().required().integer().positive(),
        daysRented: Joi.number().required().integer().positive().greater(0),
    })

    const verifySchema = schema.validate({customerId, gameId, daysRented}).error;
    if(verifySchema){
        res.sendStatus(400);
        return;
    }

    next();
}