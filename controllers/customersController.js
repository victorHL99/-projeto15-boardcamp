import db from '../db.js';

export async function getCustomers(req,res){
    console.log("Passando pela controller get customers");
    const filterCustomers = req.query.cpf;

    try{
        let resultCustomers;
        if(filterCustomers !== undefined){
            resultCustomers = await db.query(`
                SELECT * 
                FROM customers 
                WHERE cpf LIKE '${filterCustomers}%';`);
        } else {
            resultCustomers = await db.query(`
                SELECT * 
                FROM customers;`);
        }
        res.send(resultCustomers.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getCustomerId(req,res){
    console.log("Passando pela controller get customer id");
    const {id} = req.params;
    try{
        const resultCustomer = await db.query(`
            SELECT * 
            FROM customers 
            WHERE id = $1;`, [id]);

        const customer = resultCustomer.rows[0];

        if(!customer){
            res.sendStatus(404);
            return;
        }

        res.send(customer);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function postCustomers(req,res){
    console.log("Passando pela controller post customers");
    const {name, phone, cpf, birthday} = req.body;
    console.log(req.body);
    try{
        const resultCustomer = await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export async function putCustomers(req,res){
    console.log("Passando pela controller put customers");
    const {id} = req.params;
    const {name, phone, cpf, birthday} = req.body;
    try{
        const resultCustomer = await db.query(`
            UPDATE customers
            SET name = $1, phone = $2, cpf = $3, birthday = $4
            WHERE id = $5
            RETURNING *;`, [name, phone, cpf, birthday, id]);

        const customer = resultCustomer.rows[0];

        if(!customer){
            res.sendStatus(404);
            return;
        }

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}