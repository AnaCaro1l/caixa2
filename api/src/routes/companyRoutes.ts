import { Router } from 'express';
import { store, update, show, remove } from '../controllers/CompanyController';
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.post('/company', isAuth, store);

router.get('/company/:id', isAuth, show);

router.put('/company/:id', isAuth, update);

router.delete('/company/:id', isAuth, remove);

export default router;
