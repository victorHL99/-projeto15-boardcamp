import {Router} from 'express';

import {getCustomers, getCustomerId, postCustomers, putCustomers } from '../controllers/customersController.js';
import {vPostCustomerMid, vPutCustomerMid} from '../middlewares/verifiersMiddlewares.js';

const customersRouter = Router();
console.log("Passando pela rota customers");

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerId);
customersRouter.post("/customers", vPostCustomerMid ,postCustomers);
customersRouter.put("/customers/:id", vPutCustomerMid,putCustomers);

export default customersRouter;