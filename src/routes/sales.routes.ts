import { Router } from "express";

import { CreateSaleController } from "../controllers/Sales/CreateSaleController";
import { ListClientSalesController } from "../controllers/Sales/ListClientSalesController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const salesRoutes = Router();

const createSaleController = new CreateSaleController();
const listClientSalesController = new ListClientSalesController();

salesRoutes.post("/", ensureAuthenticated, createSaleController.handle);
salesRoutes.get("/findSales/", ensureAuthenticated, listClientSalesController.handle);

export { salesRoutes };