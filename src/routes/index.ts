import { Router } from 'express';
import { clientsRoutes } from './clients.routes';
import { userRoutes } from './singup.routes';


const router = Router();

router.use(userRoutes)
router.use(clientsRoutes)

export { router }