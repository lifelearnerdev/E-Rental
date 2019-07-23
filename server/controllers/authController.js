import dotenv from 'dotenv';
import User from '../config/dbConfig';
import crypt from '../helpers/hashPassword';
import decrypt from '../helpers/unhashPassword';
import jwt from '../helpers/token';

dotenv.config();

/**
 * @author Placide IRANDORA
 * @description This class handles user authentication
 */
class Authenticate {
  /**
   * user registration
   * @param {object} req
   * @param {object} res
   */
  static async registerUser(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      res.status(409).json({
        status: 409,
        error: 'user with the specified email already exists',
      });
    } else {
      req.body.password = crypt(req.body.password);
      const user = await User.create(req.body);
      res.status(201).json({
        status: 201,
        success: 'user registered',
        data: [{
          user,
        }],
      });
    }
  }

  /**
   * user sign in
   * @param {object} req
   * @param {object} res
   */
  static async signUserIn(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (!userExists) {
      res.status(400).json({ status: 400, error: 'incorrect email or password' });
    } else {
      const truePass = decrypt(req.body.password, userExists.password);
      if (truePass) {
        const token = jwt(userExists);
        const {
          id, firstname, lastname, email,
        } = userExists;
        res.status(200).json({
          status: 200,
          success: 'signed in',
          token,
          data: [{
            id,
            firstname,
            lastname,
            email,
          }],
        });
      } else {
        res.status(400).json({ status: 400, error: 'incorrect email or password' });
      }
    }
  }
}

export default Authenticate;
