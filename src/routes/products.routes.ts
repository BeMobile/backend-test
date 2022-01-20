import { Router } from "express";

import { CreateProductController } from "../controllers/products/CreateProductController";
import { DeleteProductController } from "../controllers/products/DeleteProductController";
import { FindProductController } from "../controllers/products/FindProductController";
import { ListProductsController } from "../controllers/products/ListProductsController";
import { UpdateProductController } from "../controllers/products/UpdateProductController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();
const findProductController = new FindProductController();

productsRoutes.post("/", ensureAuthenticated, createProductController.handle);
productsRoutes.get("/list", ensureAuthenticated, listProductsController.handle);
productsRoutes.get("/find/:id", ensureAuthenticated, findProductController.handle);
productsRoutes.put("/update/:id", ensureAuthenticated, updateProductController.handle);
productsRoutes.delete("/delete/:id", ensureAuthenticated, deleteProductController.handle);

export { productsRoutes };