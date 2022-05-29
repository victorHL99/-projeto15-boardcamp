import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './db.js';
import categoriesRouter from './routes/categoriesRouter.js';

const app = express();

app.use(json());
app.use(cors());
dotenv.config();

app.use(categoriesRouter);


const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
});