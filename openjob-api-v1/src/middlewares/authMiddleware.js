import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'failed',
                message: 'Missing or invalid authorization header',
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        req.user = decoded;

        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'failed',
                message: 'Invalid or expired access token',
            });
        }
        next(err);
    }
};

export default authMiddleware;