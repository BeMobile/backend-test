import { Router } from "express";
import { CreateSaleController } from "../modules/_sales/useCases/createSales/CreateSaleController";
import { ShowSaleController } from "../modules/_sales/useCases/salesDetails/ShowSalesController";


const salesRoutes = Router()

const createSaleController = new CreateSaleController();

const showSaleController = new ShowSaleController();

salesRoutes.post('/', createSaleController.handle)

salesRoutes.get('/show/:id', showSaleController.handle )

export { salesRoutes }