import express from "express";
import { ClientController } from "../controller/ClientController";

export const clientRouter = express.Router();

const userController = new ClientController();

clientRouter.post("/store", userController.storeClient);
