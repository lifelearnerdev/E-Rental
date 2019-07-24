import jwt from 'jsonwebtoken';

export default token => jwt.sign({ user: token }, process.env.SECRET_KEY);
