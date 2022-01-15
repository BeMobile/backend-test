import express from "express";
import { routes } from './routes/singup.routes'
import { clientsRoutes } from "./routes/clients.routes";

const app = express();
const port = 3333

app.use(express.json());

app.use(routes)
app.use(clientsRoutes)

app.listen(port, () => console.log(`Server is Running in port ${port}`));