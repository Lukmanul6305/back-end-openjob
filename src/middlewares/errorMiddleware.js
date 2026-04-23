import ClientError from "../exceptions/ClientError.js";

const errorMiddleware = (err, req, res, next) => {
    // Client Error (400, 401, 403, 404, dll)
    if (err instanceof ClientError) {
        return res.status(err.statusCode).json({
            status: 'fail',
            message: err.message,
        });
    }

    // Joi Validation Error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }

    // Server Error (500)
    console.error(err);
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
};

export default errorMiddleware;