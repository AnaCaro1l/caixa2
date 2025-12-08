import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import { User } from '../models/User';
import { Payment } from '../models/Payment';

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 3306,
  models: [User, Payment],
  logging: false,
});
