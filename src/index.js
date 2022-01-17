require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: process.env.REACT_APP_URL }));

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Server up running at port ${process.env.PORT}`);
});
