import { Router } from 'express';
import { store, show, update, remove } from '../controllers/UserController';
import { login } from '../controllers/SessionController';
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.post('/login', login);

router.post('/user', store);

router.get('/user/:id', isAuth, show);

router.put('/user/:id', isAuth ,update);

router.delete('/user/:id', isAuth, remove);

export default router;
