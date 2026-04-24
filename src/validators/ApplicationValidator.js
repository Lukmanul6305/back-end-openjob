import Joi from "joi";

export const ApplicationSchema = Joi.object({
    job_id: Joi.string().required(),
    cover_letter: Joi.string().optional(),
});

export const UpdateApplicationSchema = Joi.object({
    status: Joi.string().valid('pending', 'reviewed', 'accepted', 'rejected').required(),
});