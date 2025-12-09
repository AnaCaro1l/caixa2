import { Router } from "express";
import { store, update, show } from "../controllers/CompanyController";
import { isAuth } from "../middlewares/isAuth";

const router = Router();

router.post('/company', isAuth, store);

router.get('/company/:id', isAuth, show);

router.put('/company/:id', isAuth, update);

export default router;