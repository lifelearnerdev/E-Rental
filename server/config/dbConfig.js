/* eslint-disable import/no-mutable-exports */
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import UserModel from '../models/users';
import HouseModel from '../models/houses';
import FlagModel from '../models/flags';

dotenv.config();

let sequelize;

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(
    process.env.DB_NAME_TEST,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: 'postgres',
    },
    {
      logging: false,
    },
  );
} else {
  sequelize = new Sequelize(
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
}

const User = UserModel(sequelize, Sequelize);
const House = HouseModel(sequelize, Sequelize);
const Flag = FlagModel(sequelize, Sequelize);

export {
  sequelize, User, House, Flag,
};
