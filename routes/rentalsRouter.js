import {Router} from 'express';

import {getRentals} from '../controllers/rentalsController.js';

const rentalsRouter = Router();
console.log("Passando pela rota rentals");

rentalsRouter.get("/rentals", getRentals);

export default rentalsRouter;
