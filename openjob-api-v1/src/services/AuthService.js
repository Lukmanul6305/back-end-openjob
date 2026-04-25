import { query } from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthenticationError from "../exceptions/AuthenticationError.js";

const AuthService = {
    async login({ email, password }) {
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rowCount === 0) {
            throw new AuthenticationError('Invalid email or password');
        }

        const user = result.rows[0];
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new AuthenticationError('Invalid email or password');
        }

        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: '3h' }
        );

        const refreshToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.REFRESH_TOKEN_KEY,
        );

        await query('INSERT INTO authentications (token) VALUES ($1)', [refreshToken]);

        return { accessToken, refreshToken };
    },

    async refresh({ refreshToken }) {
        const result = await query('SELECT token FROM authentications WHERE token = $1', [refreshToken]);

        if (result.rowCount === 0) {
            throw new AuthenticationError('Refresh token not found');
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
        } catch {
            throw new AuthenticationError('Invalid refresh token');
        }

        const accessToken = jwt.sign(
            { id: decoded.id, role: decoded.role },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: '3h' }
        );

        return { accessToken };
    },

    async logout({ refreshToken }) {
        const result = await query('SELECT token FROM authentications WHERE token = $1', [refreshToken]);

        if (result.rowCount === 0) {
            throw new AuthenticationError('Refresh token not found');
        }

        await query('DELETE FROM authentications WHERE token = $1', [refreshToken]);
    },
};

export default AuthService;