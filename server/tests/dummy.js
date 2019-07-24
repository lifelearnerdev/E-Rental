import dotenv from 'dotenv';

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
  houseNumber: 'Kg-ny-68',
  numberOfRooms: 5,
  numberOfToiltes: 3,
  price: 500000,
  upfront: 15000000,
  district: 'Nyarugenge',
  sector: 'Agatare',
};

export {
  newUser, theUser, newHouse,
};
