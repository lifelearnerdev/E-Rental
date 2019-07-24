import Joi from 'joi';

const validate = {
  validateCreateHouse(req, res, next) {
    const houseSchema = Joi.object().keys({
      numberofbedrooms: Joi.number().integer().min(1).required(),
      numberoftoilets: Joi.number().integer().required(),
      price: Joi.number().required(),
      upfront: Joi.number().required(),
      district: Joi.string().alphanum(),
      sector: Joi.string().alphanum(),

    });
    const { error } = Joi.validate(req.body, houseSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

};

export default validate;
