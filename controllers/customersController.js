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

    try{
        
    }
}