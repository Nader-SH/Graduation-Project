export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

export const errorResponse = (res, error, statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message: error.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : undefined
    });
};
