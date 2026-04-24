import Joi from "joi";

export const BookmarkSchema = Joi.object({
    job_id: Joi.string().optional(),
});