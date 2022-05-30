import {Router} from 'express';

import {getCustomers, getCustomerId} from '../controllers/customersController.js';
import {vPostCustomerMid} from '../middlewares/verifiersMiddlewares.js';

const customersRouter = Router();
console.log("Passando pela rota customers");

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerId);
customersRouter.post("/customers", vPostCustomerMid ,postCustomers);

export default customersRouter;