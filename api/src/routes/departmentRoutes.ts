import { Router } from "express";
import { store, show, update, remove } from "../controllers/DepartmentController";
import { isAuth } from "../middlewares/isAuth";

const router = Router();

router.post('/department', isAuth, store);

router.get('/department/:id', isAuth, show);

router.put('/department/:id', isAuth, update);

router.delete('/department/:id', isAuth, remove);
export default router;