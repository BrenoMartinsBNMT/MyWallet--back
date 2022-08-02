import Joi from "joi";
export var schemaGetTransactions = Joi.object({
    token: Joi.string().required()
});
export var schemaBalance = Joi.object({
    balance: Joi.number().greater(0).required(),
    token: Joi.string().required(),
    description: Joi.string().required()
});
