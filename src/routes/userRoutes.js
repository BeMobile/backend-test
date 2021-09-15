import { Router } from 'express';
import userController from '../controllers/UserController';

const router = new Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

export default router;
