import express from 'express';
import FlagController from '../controllers/flagController';
import flag from '../middleware/flagValidation';
import authMiddleware from '../middleware/authenticate';

const router = express.Router();

const Flag = new FlagController();

router.post('/:id/flag', [authMiddleware.verifyUser, flag.validateparamsId, flag.validateCreateFlag], Flag.flagHouse);

export default router;
