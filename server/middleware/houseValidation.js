import Joi from 'joi';

const validate = {
  validateCreateHouse(req, res, next) {
    const houseSchema = Joi.object().keys({
      houseNumber: Joi.string().required(),
      numberOfRooms: Joi.number().integer().min(1).required(),
      numberOfToilets: Joi.number().integer().required(),
      price: Joi.number().required(),
      upfront: Joi.number().required(),
      district: Joi.string().alphanum().required(),
      sector: Joi.string().alphanum().required(),

    });
    const { error } = Joi.validate(req.body, houseSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

  validateparamsId(req, res, next) {
    const paramsSchema = Joi.object().keys({
      id: Joi.number().integer().positive()
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
