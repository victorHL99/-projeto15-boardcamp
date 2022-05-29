import pg from 'pg';

const {Poll} = pg;
const db = new Pool({
    host : 'localhost',
    port : 5432,
    user : 'postgres',
    password : '164902',
    database : 'polls'
});

export default db;

