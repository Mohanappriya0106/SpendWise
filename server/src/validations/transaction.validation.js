import Joi from "joi";

export const createTransactionSchema = Joi.object({
  type: Joi.string()
    .valid("income", "expense")
    .required(),

  amount: Joi.number()
    .positive()
    .precision(2)
    .required(),

  category: Joi.string()
    .trim()
    .min(1)
    .required(),

  note: Joi.string()
    .trim()
    .max(200)
    .optional(),

  date: Joi.date()
    .required()
});

export const updateTransactionSchema = Joi.object({
  type: Joi.string()
    .valid("income", "expense")
    .optional(),

  amount: Joi.number()
    .positive()
    .precision(2)
    .optional(),

  category: Joi.string()
    .trim()
    .min(1)
    .optional(),

  note: Joi.string()
    .trim()
    .max(200)
    .optional(),

  date: Joi.date()
    .optional()
});
