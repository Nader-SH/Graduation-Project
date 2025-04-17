import Joi from 'joi';

export const donorSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(2)
        .max(100)
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 100 characters'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required'
        }),
    phone: Joi.string()
        .required()
        .pattern(/^[0-9]{10}$/)
        .messages({
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Phone number must be 10 digits'
        })
});
