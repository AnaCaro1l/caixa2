import { Router } from 'express';
import { store, show, update, remove } from '../controllers/UserController';
import { login } from '../controllers/SessionController';

const router = Router();

router.post('/login', login);

router.post('/user', store);

router.get('/user/:id', show);

router.put('/user/:id', update);

router.delete('/user/:id', remove);

export default router;
