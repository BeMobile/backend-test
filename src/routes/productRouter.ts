import { ProductController } from './../controller/ProductController';
import express from "express";

export const productRouter = express.Router();

const productController = new ProductController();

productRouter.post("/store", productController.storeProduct);


