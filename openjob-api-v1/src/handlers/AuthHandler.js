import AuthService from "../services/AuthService.js";

const AuthHandler = {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.login({ email, password });

            if (result.error) {
                return res.status(result.statusCode).json({
                    status: 'failed',
                    message: result.error,
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Login successful',
                data: {
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken,
                },
            });
        } catch (err) {
            next(err);
        }
    },

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const result = await AuthService.refresh({ refreshToken });

            if (result.error) {
                return res.status(result.statusCode).json({
                    status: 'failed',
                    message: result.error,
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Access token refreshed',
                data: {
                    accessToken: result.accessToken,
                },
            });
        } catch (err) {
            next(err);
        }
    },

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const result = await AuthService.logout({ refreshToken });

            if (result.error) {
                return res.status(result.statusCode).json({
                    status: 'failed',
                    message: result.error,
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Logout successful',
            });
        } catch (err) {
            next(err);
        }
    },
};

export default AuthHandler;