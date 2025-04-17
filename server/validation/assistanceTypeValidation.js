import Joi from 'joi';

export const assistanceTypeSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(2)
        .max(100)
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 100 characters'
        }),
    description: Joi.string()
        .allow(null, ''),
    donorId: Joi.number()
        .required()
        .messages({
            'number.base': 'Donor ID must be a number'
        })
});
