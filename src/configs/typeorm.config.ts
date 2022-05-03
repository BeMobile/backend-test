import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'mysql',
  host: process.env.HOST,
  port: +process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  dropSchema: true,
};
