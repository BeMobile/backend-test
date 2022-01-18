//Create conecction with database
import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = 'database_backend_test';
  createConnection({
    ...options,
  })
})
