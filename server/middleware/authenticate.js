import jwt from 'jsonwebtoken';
/**
 * @author Placide IRANDORA
 * @description verify if the user is registered and grant or deny them access
 * @param {object} req
 * @param {object} res
 * @param {request} next
 */
const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'undefined' || !authHeader) {
    res.status(401).json({ status: 401, error: 'unauthorized access. login or register' });
  } else {
    req.token = authHeader;

    jwt.verify(req.token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        res.status(403).json({ status: 403, error: `${error.message}` });
      } else if (decoded) {
        req.userEmail = decoded.email;
        next();
      } else {
        res.status(403).json({
          status: 403,
          error: 'access denied',
        });
      }
    });
  }
};

export default {
  verifyUser,
};
