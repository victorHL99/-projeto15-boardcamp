import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './db.js';

const app = express();

app.use(json());
app.use(cors());
dotenv.config();


const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
});