import express from 'express';
import user from '../middleware/userValidation';
import authcontroller from '../controllers/authController';

const router = express.Router();

router.post('/auth/signup', user.validateRegistration, authcontroller.registerUser);

export default router;
