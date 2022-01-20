require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: process.env.APP_URL }));

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

const clientRouter = require("./routes/client.routes");
app.use("/api", clientRouter);

const productRouter = require("./routes/product.routes");
app.use("/api", productRouter);

const saleRouter = require("./routes/sale.routes");
app.use("/api", saleRouter);

const addressRouter = require("./routes/address.routes");
app.use("/api", addressRouter);

const phoneRouter = require("./routes/phone.routes");
app.use("/api", phoneRouter);

app.listen(port, () => {
  console.log(`Server up running at port ${process.env.PORT}`);
});
