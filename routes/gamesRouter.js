import {Router} from 'express';

import {getGames, postGames} from '../controllers/gamesController.js';
import {vPostGamesMid} from '../middlewares/verifiersMiddlewares.js';

const gamesRouter = Router();
console.log("Passando pela rota games");

gamesRouter.get("/games", getGames);
gamesRouter.post("/games",vPostGamesMid, postGames);

export default gamesRouter;