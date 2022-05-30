import {Router} from 'express';

import {getCustomers} from '../controllers/customersController.js';

const customersRouter = Router();
console.log("Passando pela rota customers");

customersRouter.get("/customers", getCustomers);

export default customersRouter;