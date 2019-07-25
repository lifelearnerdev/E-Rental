import express from 'express';
import user from '../middleware/userValidation';
import authcontroller from '../controllers/authController';

const router = express.Router();

router.post('/signup', user.validateRegistration, authcontroller.registerUser);
router.post('/signin', user.validateSignIn, authcontroller.signUserIn);

export default router;
