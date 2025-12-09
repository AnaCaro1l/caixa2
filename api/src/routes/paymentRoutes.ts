import { Router } from 'express';
import { store, list, show } from '../controllers/PaymentController';
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.post('/payment', isAuth, store);

router.get('/payments', isAuth, list);

router.get('/payment/:id', isAuth, show);
export default router;
