import Joi from "joi";

export const schemaSignUp = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().min(6).max(24).required(),
});

export const schemaSignIn = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
