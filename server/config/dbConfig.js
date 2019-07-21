import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import UserModel from '../models/users';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
  },
  {
    logging: false,
  },
);

const User = UserModel(sequelize, Sequelize);

export { sequelize };
export default User;
