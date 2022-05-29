import pg from 'pg';

const {Pool} = pg;

const user = 'postgres';
const password = '164902';
const host = 'localhost';
const port = 5432;
const database = 'boardcamp';

const db = new Pool({
    host,
    port,
    user,
    password,
    database
});

export default db;

