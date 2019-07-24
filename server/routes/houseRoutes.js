import express from 'express';
import multiparty from 'connect-multiparty';
import HouseController from '../controllers/houseController';
import house from '../middleware/houseValidation';
import authMiddleware from '../middleware/authenticate';

const connectMultiparty = multiparty();
const router = express.Router();

const House = new HouseController();

router.post('/', [authMiddleware.verifyUser, connectMultiparty, house.validateCreateHouse], House.postHouse);


export default router;
