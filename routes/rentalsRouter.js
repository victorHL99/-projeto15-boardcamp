import {Router} from 'express';

import {getRentals, postRentals, postReturnRental, deleteRental} from '../controllers/rentalsController.js';
import {vPostRentalsMid} from '../middlewares/verifiersMiddlewares.js';

const rentalsRouter = Router();
console.log("Passando pela rota rentals");

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", vPostRentalsMid ,postRentals);
rentalsRouter.post("/rentals/:id/return", postReturnRental)
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;
