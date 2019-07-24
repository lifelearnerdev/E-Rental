import dotenv from 'dotenv';
import User from '../config/dbConfig';
import crypt from '../helpers/hashPassword';

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
      res.status(400).json({
        status: 400,
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
}

export default Authenticate;
