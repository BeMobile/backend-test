const express = require('express');
const cors    = require('cors');
                require('dotenv').config();

const log       = require('./logger/index');
const routes    = require('./routes');
const sequelize = require('./db/sequelize');

const app  = express();
const port = process.env.ENV_SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
routes(app);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();

    log.info(`Server listening at http://localhost:${port}`);
  } catch (err) {
    log.error('Failed on connect to database', err);
  }
});
