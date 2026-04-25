import { query } from "../config/database.js";
import NotFoundError from "../exceptions/NotFoundError.js";

const ProfileService = {
    async getProfile(user_id) {
        const result = await query(
            'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
            [user_id]
        );

        if (result.rowCount === 0) {
            throw new NotFoundError('User not found');
        }

        return result.rows[0];
    },

    async getProfileApplications(user_id) {
        const result = await query(
            `SELECT a.*, j.title AS job_title, c.name AS company_name
             FROM applications a
             LEFT JOIN jobs j ON a.job_id = j.id
             LEFT JOIN companies c ON j.company_id = c.id
             WHERE a.user_id = $1
             ORDER BY a.created_at DESC`,
            [user_id]
        );

        return result.rows;
    },

    async getProfileBookmarks(user_id) {
        const result = await query(
            `SELECT b.*, j.title AS job_title, c.name AS company_name
             FROM bookmarks b
             LEFT JOIN jobs j ON b.job_id = j.id
             LEFT JOIN companies c ON j.company_id = c.id
             WHERE b.user_id = $1
             ORDER BY b.created_at DESC`,
            [user_id]
        );

        return result.rows;
    },
};

export default ProfileService;