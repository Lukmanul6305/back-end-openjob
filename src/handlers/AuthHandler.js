import AuthService from "../services/AuthService.js";

const AuthHandler = {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await AuthService.login({ email, password });

            return res.status(200).json({
                status: 'success',
                message: 'Login successful',
                data: { accessToken, refreshToken },
            });
        } catch (err) {
            next(err);
        }
    },

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const { accessToken } = await AuthService.refresh({ refreshToken });

            return res.status(200).json({
                status: 'success',
                message: 'Access token refreshed',
                data: { accessToken },
            });
        } catch (err) {
            next(err);
        }
    },

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            await AuthService.logout({ refreshToken });

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