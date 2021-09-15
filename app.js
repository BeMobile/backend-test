import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';
import userRoutes from './src/routes/userRoutes';
import clientRoutes from './src/routes/clientRoutes';
import salesRoutes from './src/routes/salesRouter';
import productsRoutes from './src/routes/productsRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/users/', userRoutes);
    this.app.use('/clients/', clientRoutes);
    this.app.use('/sales/', salesRoutes);
    this.app.use('/products/', productsRoutes);
  }
}

export default new App().app;
