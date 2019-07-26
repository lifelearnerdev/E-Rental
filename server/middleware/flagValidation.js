/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

const validate = {
  validateCreateFlag(req, res, next) {
    const flagSchema = Joi.object().keys({
      reason: Joi.string().min(3).max(50).required(),
      description: Joi.string().min(15).max(250).required(),
    });
    const { error } = Joi.validate(req.body, flagSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },
  validateparamsId(req, res, next) {
    const paramsSchema = Joi.object().keys({
      id: Joi.number().integer().positive(),
    });
    const { error } = Joi.validate(req.params, paramsSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },
};

export default validate;
