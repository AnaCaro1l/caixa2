import { Router } from 'express';
import { store } from '../controllers/UserController';
import { login } from '../controllers/SessionController';

const router = Router();

router.post('/login', login);

router.post('/user', store);

export default router;