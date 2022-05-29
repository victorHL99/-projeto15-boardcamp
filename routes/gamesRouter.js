import {Router} from 'express';

import {getGames} from '../controllers/gamesController.js';

const gamesRouter = Router();
console.log("Passando pela rota games");

gamesRouter.get("/games", getGames);

export default gamesRouter;