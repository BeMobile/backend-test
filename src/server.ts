import "reflect-metadata"
import express, {Request, Response, NextFunction} from "express";
import "express-async-errors";
import "./database";//import database 
import "./shared/container"

import { AppError } from "./errors/AppError";
import { router } from "./routes";

const app = express();
const port = 3333

app.use(express.json());

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }
  return res.status(500).json({
    status: "error",
    message: `Erro interno  - ${err.message}`
  });
}
)

app.listen(port, () => console.log(`Server is Running in port ${port}`));