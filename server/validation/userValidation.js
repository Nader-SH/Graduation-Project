import Joi from 'joi';

export const registerSchema = Joi.object({
    firstName: Joi.string()
        .required()
        .min(2)
        .max(50)
        .messages({
            'string.empty': 'First name is required',
            'string.min': 'First name must be at least 2 characters long',
            'string.max': 'First name cannot exceed 50 characters'
        }),
    lastName: Joi.string()
        .required()
        .min(2)
        .max(50)
        .messages({
            'string.empty': 'Last name is required',
            'string.min': 'Last name must be at least 2 characters long',
            'string.max': 'Last name cannot exceed 50 characters'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required'
        }),
    password: Joi.string()
        .required()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
            'string.pattern.base': 'Password must contain only letters and numbers'
        }),
    role: Joi.string()
        .valid('user', 'admin')
        .default('user'),
    type: Joi.string()
        .required()
        .valid('volunteer', 'admin')
        .messages({
            'string.empty': 'User type is required',
            'any.only': 'User type must be either volunteer or admin'
        }),
    image: Joi.string()
        .allow(null, '')
});

export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required'
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required'
        })
});

export const updateUserSchema = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(50),
    lastName: Joi.string()
        .min(2)
        .max(50),
    email: Joi.string()
        .email(),
    image: Joi.string()
        .allow(null, '')
});
