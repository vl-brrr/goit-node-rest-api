import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .length(14)
    .pattern(/^[(]+[0-9]{3}[)]+[ ]+[0-9]{3}[-]+[0-9]{4}$/)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string()
    .length(14)
    .pattern(/^[(]+[0-9]{3}[)]+[ ]+[0-9]{3}[-]+[0-9]{4}$/),
});
