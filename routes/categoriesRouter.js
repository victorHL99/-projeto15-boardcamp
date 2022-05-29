import {Router} from 'express';

import {getCategories, postCategories} from '../controllers/categoriesController.js';
import {vPostCategoriesMid} from '../middlewares/verifiersMiddlewares.js';

const categoriesRouter = Router();
console.log("Passando pela rota categorias");

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", vPostCategoriesMid ,postCategories);

export default categoriesRouter;

