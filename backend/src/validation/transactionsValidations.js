import Joi from "joi";

export const newTransactionSchema = Joi.object({
    type: Joi.string()
        .valid("Withdraw", "Deposit")
        .required()
        .messages({
            "any.only": "Type must be either 'Withdraw' or 'Deposit'.",
            "string.empty": "Type is required.",
        }),
    amount: Joi.number().required().messages({
        "number.base": "Amount must be a number.",
        "number.empty": "Amount is required.",
    }),
    description: Joi.string().required().messages({
        "string.empty": "Description is required.",
    }),
    account: Joi.string().required().messages({
        "string.empty": "Account is required.",
    }),
    category: Joi.string().required().messages({
        "string.empty": "Category is required.",
    }),
});
