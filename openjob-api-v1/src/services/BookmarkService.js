import { query } from "../config/database.js";
import { randomUUID } from "crypto";
import NotFoundError from "../exceptions/NotFoundError.js";
import AuthorizationError from "../exceptions/AuthorizationError.js";
import ClientError from "../exceptions/ClientError.js";

const BookmarkService = {
    async createBookmark({ user_id, job_id }) {
        // Cek job ada
        const job = await query('SELECT id FROM jobs WHERE id = $1', [job_id]);
        if (job.rowCount === 0) {
            throw new NotFoundError('Job not found');
        }

        // Cek sudah bookmark
        const check = await query(
            'SELECT id FROM bookmarks WHERE user_id = $1 AND job_id = $2',
            [user_id, job_id]
        );
        if (check.rowCount > 0) {
            throw new ClientError('Job already bookmarked', 400);
        }

        const id = `bookmark-${randomUUID()}`;
        const result = await query(
            'INSERT INTO bookmarks (id, user_id, job_id) VALUES ($1, $2, $3) RETURNING *',
            [id, user_id, job_id]
        );

        return result.rows[0];
    },

    async getAllBookmarks({ user_id }) {
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

    async getBookmarkById({ id, user_id }) {
        const result = await query(
            `SELECT b.*, j.title AS job_title, c.name AS company_name
             FROM bookmarks b
             LEFT JOIN jobs j ON b.job_id = j.id
             LEFT JOIN companies c ON j.company_id = c.id
             WHERE b.id = $1`,
            [id]
        );

        if (result.rowCount === 0) {
            throw new NotFoundError('Bookmark not found');
        }

        return result.rows[0];
    },

    async deleteBookmark({ user_id, job_id }) {
        const check = await query(
            'SELECT id FROM bookmarks WHERE user_id = $1 AND job_id = $2',
            [user_id, job_id]
        );

        if (check.rowCount === 0) {
            throw new NotFoundError('Bookmark not found');
        }

        await query(
            'DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2',
            [user_id, job_id]
        );
    },
};

export default BookmarkService;