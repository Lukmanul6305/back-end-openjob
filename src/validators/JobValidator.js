import Joi from "joi";

export const JobSchema = Joi.object({
    company_id: Joi.string().required(),
    category_id: Joi.string().required(),
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().optional(),
    type: Joi.string().valid('full-time', 'part-time', 'freelance', 'internship').optional(),
    salary_min: Joi.number().integer().min(0).optional(),
    salary_max: Joi.number().integer().min(0).optional(),
});