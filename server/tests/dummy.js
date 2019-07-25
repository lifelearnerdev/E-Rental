import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const newUser = {
  firstname: 'Emmanuel',
  lastname: 'CYUBAHIRO',
  email: 'cyubahiro@gmail.com',
  password: '1234aB',
  samePassword: '1234aB',
};

const theUser = {
  email: newUser.email,
  password: newUser.password,
};
const newHouse = {
  houseNumber: 'Kgny68',
  numberOfRooms: 5,
  numberOfToiltes: 3,
  price: 500000,
  upfront: 15000000,
  district: 'Nyarugenge',
  sector: 'Agatare',
};

const invalidHouse1 = {
  houseNumber: 'Kgny68',
  numberOfRooms: 0,
  numberOfToiltes: 3,
  price: 500000,
  upfront: 15000000,
  district: 'Nyarugenge',
  sector: 'Agatare',
};

const info = {
  id: 1,
  email: 'cyubahiro@gmail.com',
};
const token = jwt.sign(info, process.env.SECRET_KEY);

export {
  newUser, theUser, newHouse, token, invalidHouse1,
};
