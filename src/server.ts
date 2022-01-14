import express from "express";
import { routes } from './routes/singup.routes'

const app = express();
const port = 3333

app.use(express.json());

app.use(routes)

app.listen(port, () => console.log(`Server is Running in port ${port}`));