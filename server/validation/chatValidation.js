import Joi from 'joi';

export const chatSchema = Joi.object({
    text: Joi.string()
        .required()
        .min(1)
        .messages({
            'string.empty': 'Message text is required',
            'string.min': 'Message cannot be empty'
        }),
    receiveId: Joi.number()
        .required()
        .messages({
            'number.base': 'Receiver ID must be a number'
        }),
    senderId: Joi.number()
        .required()
        .messages({
            'number.base': 'Sender ID must be a number'
        })
});

export const updateChatSchema = Joi.object({
    text: Joi.string()
        .required()
        .min(1)
        .messages({
            'string.empty': 'Message text is required',
            'string.min': 'Message cannot be empty'
        })
});
