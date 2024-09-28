import * as Joi from 'joi';

export const JoiValidation = Joi.object({
    MONGO_URI: Joi.string().required(),
    EXECUTE_SEEDS: Joi.boolean().required(),
})