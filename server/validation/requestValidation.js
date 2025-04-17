import Joi from 'joi';

export const requestSchema = Joi.object({
    applicantName: Joi.string()
        .required()
        .min(2)
        .max(100)
        .messages({
            'string.empty': 'Applicant name is required',
            'string.min': 'Applicant name must be at least 2 characters long',
            'string.max': 'Applicant name cannot exceed 100 characters'
        }),
    nationalId: Joi.string()
        .required()
        .pattern(/^[0-9]{10}$/)
        .messages({
            'string.empty': 'National ID is required',
            'string.pattern.base': 'National ID must be 10 digits'
        }),
    familyMembersCount: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Family members count must be a number',
            'number.min': 'Family members count must be at least 1'
        }),
    headOfFamilyStatus: Joi.string()
        .required()
        .messages({
            'string.empty': 'Head of family status is required'
        }),
    location: Joi.string()
        .required()
        .messages({
            'string.empty': 'Location is required'
        }),
    description: Joi.string()
        .allow(null, ''),
    status: Joi.string()
        .valid('pending', 'approved', 'rejected', 'completed')
        .default('pending')
});

export const updateRequestStatusSchema = Joi.object({
    status: Joi.string()
        .valid('pending', 'approved', 'rejected', 'completed')
        .required()
        .messages({
            'any.only': 'Status must be one of: pending, approved, rejected, completed'
        })
});
