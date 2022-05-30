import {Router} from 'express';

const customersRouter = Router();
console.log("Passando pela rota customers");

customersRouter.get("/customers", getCustomers);

export default customersRouter;