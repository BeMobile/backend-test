import { Router } from 'express';
import { authenticateRouter } from './authenticate.routes';
import { clientsRoutes } from './clients.routes';
import { userRoutes } from './singup.routes';


const router = Router();

router.use("/user", userRoutes)
router.use("/clients",clientsRoutes)
router.use(authenticateRouter)

export { router }