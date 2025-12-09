import { Router } from 'express';
import userRoutes from './routes/userRoutes';
import companyRoutes from './routes/companyRoutes';

const routes = Router();

routes.use(userRoutes);
routes.use(companyRoutes);

export default routes;