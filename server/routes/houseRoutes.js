import express from 'express';
import multiparty from 'connect-multiparty';
import HouseController from '../controllers/houseController';
import house from '../middleware/houseValidation';

const connectMultiparty = multiparty();
const router = express.Router();

const House = new HouseController();

router.post('/', [connectMultiparty, house.validateCreateHouse], House.postHouse);


export default router;
