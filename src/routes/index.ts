import { Router } from 'express';
import { authenticateRouter } from './authenticate.routes';
import { clientsRoutes } from './clients.routes';
import { productRoutes } from './product.routes';
import { salesRoutes } from './sales.routes';
import { userRoutes } from './singup.routes';


const router = Router();

router.use(authenticateRouter)
router.use("/user", userRoutes)
router.use("/clients",clientsRoutes)
router.use("/products",productRoutes)
router.use("/sales", salesRoutes)


export { router }