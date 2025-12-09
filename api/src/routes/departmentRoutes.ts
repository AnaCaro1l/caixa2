import { Router } from "express";
import { store } from "../controllers/DepartmentController";
import { isAuth } from "../middlewares/isAuth";

const router = Router();

router.post('/department', isAuth, store);

export default router;