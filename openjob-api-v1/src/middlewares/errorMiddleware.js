import ClientError from "../exceptions/ClientError.js";

const errorMiddleware = (err, req, res, next) => {
    if (err instanceof ClientError) {
        return res.status(err.statusCode).json({
            status: 'failed',
            message: err.message,
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'failed',
            message: err.message,
        });
    }

    console.error(err);
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
};

export default errorMiddleware;