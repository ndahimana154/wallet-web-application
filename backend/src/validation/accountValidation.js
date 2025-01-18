import Joi from "joi";

export const newAccountSchema = Joi.object({
    name: Joi.string().required(),
    accNumber: Joi.required()
})