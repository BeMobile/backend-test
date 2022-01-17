import { Router } from 'express';
import { clientsRoutes } from './clients.routes';
import { routes } from './singup.routes';

const router = Router();

router.use(routes)
router.use(clientsRoutes)

export { router }