import Joi from 'joi';

export const donationSchema = Joi.object({
    typeName: Joi.number()
        .required()
        .messages({
            'number.base': 'Type name must be a number'
        }),
    donorId: Joi.number()
        .required()
        .messages({
            'number.base': 'Donor ID must be a number'
        }),
    requestId: Joi.number()
        .required()
        .messages({
            'number.base': 'Request ID must be a number'
        }),
    assistanceId: Joi.number()
        .required()
        .messages({
            'number.base': 'Assistance ID must be a number'
        }),
    donationType: Joi.string()
        .required()
        .messages({
            'string.empty': 'Donation type is required'
        }),
    quantity: Joi.number()
        .required()
        .min(1)
        .messages({
            'number.base': 'Quantity must be a number',
            'number.min': 'Quantity must be at least 1'
        }),
    amount: Joi.number()
        .required()
        .precision(2)
        .min(0)
        .messages({
            'number.base': 'Amount must be a number',
            'number.min': 'Amount cannot be negative'
        }),
    deliveryMethod: Joi.string()
        .required()
        .messages({
            'string.empty': 'Delivery method is required'
        })
});
