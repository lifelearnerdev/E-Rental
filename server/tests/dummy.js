import dotenv from 'dotenv';

dotenv.config();

const newUser = {
  firstname: 'Emmanuel',
  lastname: 'CYUBAHIRO',
  email: 'cyubahiro@gmail.com',
  password: '123456',
};

const theUser = {
  email: newUser.email,
  password: newUser.password,
};

export {
  newUser, theUser,
};
