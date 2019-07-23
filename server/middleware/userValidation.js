import Joi from 'joi';

const validate = {
  /**
   * validate user submitted information
   * prior to a successful user registration
   * @param {object} req
   * @param {object} res
   * @param {request} next
   */
  validateRegistration(req, res, next) {
    const userSchema = Joi.object().keys({
      firstname: Joi.string().alphanum().min(4).max(15)
        .required(),
      lastname: Joi.string().alphanum().min(4).max(15)
        .required(),
      email: Joi.string().email({ minDomainAtoms: 2 })
        .required(),
      password: Joi.string().alphanum().min(3).max(15)
        .required(),
    });

    const { error } = Joi.validate(req.body, userSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

  /**
   * validate user submitted information
   * prior to a successful user login
   * @param {object} req
   * @param {object} res
   * @param {request} next
   */
  validateSignIn(req, res, next) {
    const loginSchema = Joi.object().keys({
      email: Joi.string().email({ minDomainAtomas: 2 })
        .required(),
      password: Joi.string().alphanum().min(3).max(15)
        .required(),
    });

    const { error } = Joi.validate(req.body, loginSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },
};

export default validate;
