import Joi from "joi";

export const CategorySchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
});