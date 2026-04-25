import { query } from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AuthService = {
    async login({ email, password }) {
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rowCount === 0) {
            return { error: 'Invalid email or password', statusCode: 401 };
        }

        const user = result.rows[0];
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return { error: 'Invalid email or password', statusCode: 401 };
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
            return { error: 'Refresh token not found', statusCode: 400 };
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
        } catch {
            return { error: 'Invalid refresh token', statusCode: 400 };
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
            return { error: 'Refresh token not found', statusCode: 400 };
        }

        await query('DELETE FROM authentications WHERE token = $1', [refreshToken]);
        return { success: true };
    },
};

export default AuthService;