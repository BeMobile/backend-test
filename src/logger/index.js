const logger = require('pino');
const moment = require('moment');

const log = logger({
  prettyPrint: true,
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${moment().year()}/${moment().month()}/${moment().date()} - ${moment().hour()}:${moment().minute()}:${moment().second()}"`
});

module.exports = log;
