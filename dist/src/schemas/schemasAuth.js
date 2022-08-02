import Joi from "joi";
export var schemaSignUp = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().min(6).max(24).required()
});
export var schemaSignIn = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});
