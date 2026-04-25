import { query } from "../config/database.js";
import { randomUUID } from "crypto";
import NotFoundError from "../exceptions/NotFoundError.js";
import AuthorizationError from "../exceptions/AuthorizationError.js";
import ClientError from "../exceptions/ClientError.js";

const ApplicationService = {
    async createApplication({ user_id, job_id, cover_letter }) {
        // Cek job ada
        const job = await query('SELECT id FROM jobs WHERE id = $1', [job_id]);
        if (job.rowCount === 0) {
            throw new NotFoundError('Job not found');
        }

        // Cek sudah apply
        const check = await query(
            'SELECT id FROM applications WHERE user_id = $1 AND job_id = $2',
            [user_id, job_id]
        );
        if (check.rowCount > 0) {
            throw new ClientError('You have already applied for this job', 400);
        }

        const id = `application-${randomUUID()}`;
        const result = await query(
            `INSERT INTO applications (id, user_id, job_id, cover_letter)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [id, user_id, job_id, cover_letter]
        );

        return result.rows[0];
    },

    async getAllApplications() {
        const result = await query(
            `SELECT a.*, u.name AS user_name, j.title AS job_title
             FROM applications a
             LEFT JOIN users u ON a.user_id = u.id
             LEFT JOIN jobs j ON a.job_id = j.id
             ORDER BY a.created_at DESC`
        );
        return result.rows;
    },

    async getApplicationById(id) {
        const result = await query(
            `SELECT a.*, u.name AS user_name, j.title AS job_title
             FROM applications a
             LEFT JOIN users u ON a.user_id = u.id
             LEFT JOIN jobs j ON a.job_id = j.id
             WHERE a.id = $1`,
            [id]
        );
        if (result.rowCount === 0) {
            throw new NotFoundError('Application not found');
        }
        return result.rows[0];
    },

    async getApplicationsByUserId(userId) {
        const result = await query(
            `SELECT a.*, u.name AS user_name, j.title AS job_title
             FROM applications a
             LEFT JOIN users u ON a.user_id = u.id
             LEFT JOIN jobs j ON a.job_id = j.id
             WHERE a.user_id = $1
             ORDER BY a.created_at DESC`,
            [userId]
        );
        return result.rows;
    },

    async getApplicationsByJobId(jobId) {
        const result = await query(
            `SELECT a.*, u.name AS user_name, j.title AS job_title
             FROM applications a
             LEFT JOIN users u ON a.user_id = u.id
             LEFT JOIN jobs j ON a.job_id = j.id
             WHERE a.job_id = $1
             ORDER BY a.created_at DESC`,
            [jobId]
        );
        return result.rows;
    },

    async updateApplicationStatus({ id, user_id, status }) {
        const application = await query('SELECT * FROM applications WHERE id = $1', [id]);
        if (application.rowCount === 0) {
            throw new NotFoundError('Application not found');
        }

        const result = await query(
            'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        return result.rows[0];
    },

    async deleteApplication({ id, user_id }) {
        const application = await query('SELECT * FROM applications WHERE id = $1', [id]);
        if (application.rowCount === 0) {
            throw new NotFoundError('Application not found');
        }

        if (application.rows[0].user_id !== user_id) {
            throw new AuthorizationError('You are not authorized to delete this application');
        }

        await query('DELETE FROM applications WHERE id = $1', [id]);
    },
};

export default ApplicationService;