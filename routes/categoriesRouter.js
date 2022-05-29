import {Router} from 'express';

import {getCategories, postCategories} from '../controllers/categoriesController.js';

const categoriesRouter = Router();
console.log("Passando pela rota categorias");

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", postCategories);

export default categoriesRouter;

