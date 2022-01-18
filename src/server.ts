import "reflect-metadata"
import express from "express";
import { router } from "./routes";

import "./shared/container"

import "./database";//import database 

const app = express();
const port = 3333

app.use(express.json());

app.use(router)

app.listen(port, () => console.log(`Server is Running in port ${port}`));