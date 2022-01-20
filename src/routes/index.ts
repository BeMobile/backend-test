import { Router } from "express";

import { clientsRoutes } from "./clients.routes";
import { productsRoutes } from "./products.routes";
import { salesRoutes } from "./sales.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/", usersRoutes);
router.use("/clients", clientsRoutes);
router.use("/products", productsRoutes);
router.use("/sales", salesRoutes);

export { router };