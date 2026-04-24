import Joi from "joi";

export const CompanySchema = Joi.object({
    name: Joi.string().min(3).max(150).required(),
    description: Joi.string().optional(),
    location: Joi.string().max(150).optional(),
    website: Joi.string().uri().optional(),
});