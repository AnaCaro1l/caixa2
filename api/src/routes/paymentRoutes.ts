import { Router } from 'express';
import { store, list, show, remove } from '../controllers/PaymentController';
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.post('/payment', isAuth, store);

router.get('/payments', isAuth, list);

router.get('/payment/:id', isAuth, show);

router.delete('/payment/:id', isAuth, remove);

export default router;
