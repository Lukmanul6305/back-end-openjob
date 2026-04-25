import { query } from "../config/database.js";
import { randomUUID } from "crypto";
import NotFoundError from "../exceptions/NotFoundError.js";
import AuthorizationError from "../exceptions/AuthorizationError.js";

const JobService = {
    async createJob({ company_id, category_id, title, description, type, salary_min, salary_max }) {
        const id = `job-${randomUUID()}`;
        const result = await query(
            `INSERT INTO jobs (id, company_id, category_id, title, description, type, salary_min, salary_max)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [id, company_id, category_id, title, description, type, salary_min, salary_max]
        );
        return result.rows[0];
    },

    async getAllJobs({ title, companyName } = {}) {
        let queryText = `
            SELECT j.*, c.name AS company_name, cat.name AS category_name
            FROM jobs j
            LEFT JOIN companies c ON j.company_id = c.id
            LEFT JOIN categories cat ON j.category_id = cat.id
            WHERE 1=1
        `;
        const params = [];

        if (title) {
            params.push(`%${title}%`);
            queryText += ` AND j.title ILIKE $${params.length}`;
        }

        if (companyName) {
            params.push(`%${companyName}%`);
            queryText += ` AND c.name ILIKE $${params.length}`;
        }

        queryText += ' ORDER BY j.created_at DESC';

        const result = await query(queryText, params);
        return result.rows;
    },

    async getJobById(id) {
        const result = await query(
            `SELECT j.*, c.name AS company_name, cat.name AS category_name
             FROM jobs j
             LEFT JOIN companies c ON j.company_id = c.id
             LEFT JOIN categories cat ON j.category_id = cat.id
             WHERE j.id = $1`,
            [id]
        );
        if (result.rowCount === 0) {
            throw new NotFoundError('Job not found');
        }
        return result.rows[0];
    },

    async getJobsByCompanyId(companyId) {
        const result = await query(
            `SELECT j.*, c.name AS company_name, cat.name AS category_name
             FROM jobs j
             LEFT JOIN companies c ON j.company_id = c.id
             LEFT JOIN categories cat ON j.category_id = cat.id
             WHERE j.company_id = $1
             ORDER BY j.created_at DESC`,
            [companyId]
        );
        return result.rows;
    },

    async getJobsByCategoryId(categoryId) {
        const result = await query(
            `SELECT j.*, c.name AS company_name, cat.name AS category_name
             FROM jobs j
             LEFT JOIN companies c ON j.company_id = c.id
             LEFT JOIN categories cat ON j.category_id = cat.id
             WHERE j.category_id = $1
             ORDER BY j.created_at DESC`,
            [categoryId]
        );
        return result.rows;
    },

    async updateJob({ id, user_id, company_id, category_id, title, description, type, salary_min, salary_max }) {
        // Cek job ada dan user adalah owner company
        const job = await query(
            `SELECT j.*, c.user_id AS company_owner
             FROM jobs j
             LEFT JOIN companies c ON j.company_id = c.id
             WHERE j.id = $1`,
            [id]
        );

        if (job.rowCount === 0) {
            throw new NotFoundError('Job not found');
        }

        if (job.rows[0].company_owner !== user_id) {
            throw new AuthorizationError('You are not authorized to update this job');
        }

        const result = await query(
            `UPDATE jobs SET company_id=$1, category_id=$2, title=$3, description=$4,
             type=$5, salary_min=$6, salary_max=$7 WHERE id=$8 RETURNING *`,
            [company_id, category_id, title, description, type, salary_min, salary_max, id]
        );

        return result.rows[0];
    },

    async deleteJob({ id, user_id }) {
        const job = await query(
            `SELECT j.*, c.user_id AS company_owner
             FROM jobs j
             LEFT JOIN companies c ON j.company_id = c.id
             WHERE j.id = $1`,
            [id]
        );

        if (job.rowCount === 0) {
            throw new NotFoundError('Job not found');
        }

        if (job.rows[0].company_owner !== user_id) {
            throw new AuthorizationError('You are not authorized to delete this job');
        }

        await query('DELETE FROM jobs WHERE id = $1', [id]);
    },
};

export default JobService;