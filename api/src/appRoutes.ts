import { Router } from 'express';
import userRoutes from './routes/userRoutes';
import companyRoutes from './routes/companyRoutes';
import paymentRoutes from './routes/paymentRoutes';
import departmentRoutes from './routes/departmentRoutes';

const routes = Router();

routes.use(userRoutes);
routes.use(companyRoutes);
routes.use(paymentRoutes);
routes.use(departmentRoutes);

export default routes;