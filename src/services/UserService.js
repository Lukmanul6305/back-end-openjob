import { query } from "../config/database.js";
import { randomUUID } from "crypto";
import NotFoundError from "../exceptions/NotFoundError.js";
import ClientError from "../exceptions/ClientError.js";
import bcrypt from "bcrypt";

const UserService = {
    async register({ name, email, password, role = 'jobseeker' }) {
        const checkEmail = await query('SELECT id FROM users WHERE email = $1', [email]);
        if (checkEmail.rowCount > 0) {
            throw new ClientError('Email already registered', 400);
        }

        const id = `user-${randomUUID()}`;
        const hashedPassword = await bcrypt.hash(password, 10);

        await query(
            'INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5)',
            [id, name, email, hashedPassword, role]
        );

        return { id, name, email, role };
    },

    async getUserById(id) {
        const result = await query(
            'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
            [id]
        );

        if (result.rowCount === 0) {
            throw new NotFoundError('User not found');
        }

        return result.rows[0];
    },
};

export default UserService;