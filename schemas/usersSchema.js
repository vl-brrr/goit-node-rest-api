import Joi from "joi";

import { subscriptionTypes } from "../constants/subscriptionTypes.js";

export const registerUserDataSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    ) // Requires at least one lowercase letter, one uppercase letter, one digit, one special character
    .required(),
});

export const subscriptionUserUpdateSchema = Joi.object({
  subscription: Joi.string()
    .valid(...Object.values(subscriptionTypes))
    .required(),
});
