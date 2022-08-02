import Joi from "joi";

export const schemaGetTransactions = Joi.object({
  token: Joi.string().required(),
});

export const schemaBalance = Joi.object({
  balance: Joi.number().greater(0).required(),
  token: Joi.string().required(),
  description: Joi.string().required(),
});
