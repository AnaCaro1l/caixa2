import { Router } from "express";
import { store, show, update } from "../controllers/DepartmentController";
import { isAuth } from "../middlewares/isAuth";

const router = Router();

router.post('/department', isAuth, store);

router.get('/department/:id', isAuth, show);

router.put('/department/:id', isAuth, update);

export default router;