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