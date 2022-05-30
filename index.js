import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './db.js';
import categoriesRouter from './routes/categoriesRouter.js';
import gamesRouter from './routes/gamesRouter.js';
import customersRouter from './routes/customersRouter.js';

const app = express();

app.use(json());
app.use(cors());
dotenv.config();

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
});