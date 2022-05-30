import {Router} from 'express';

import {getCustomers, getCustomerId} from '../controllers/customersController.js';

const customersRouter = Router();
console.log("Passando pela rota customers");

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerId);

export default customersRouter;