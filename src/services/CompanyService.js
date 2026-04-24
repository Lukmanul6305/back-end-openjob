import { query } from "../config/database.js";
import { randomUUID } from "crypto";
import NotFoundError from "../exceptions/NotFoundError.js";
import AuthorizationError from "../exceptions/AuthorizationError.js";
import ClientError from "../exceptions/ClientError.js";

const CompanyService = {
    async createCompany({ user_id, name, description, location, website }) {
        const check = await query('SELECT id FROM companies WHERE name = $1', [name]);
        if (check.rowCount > 0) {
            throw new ClientError('Company name already exists', 400);
        }

        const id = `company-${randomUUID()}`;
        const result = await query(
            'INSERT INTO companies (id, user_id, name, description, location, website) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [id, user_id, name, description, location, website]
        );

        return result.rows[0];
    },

    async getAllCompanies() {
        const result = await query('SELECT * FROM companies ORDER BY created_at DESC');
        return result.rows;
    },

    async getCompanyById(id) {
        const result = await query('SELECT * FROM companies WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            throw new NotFoundError('Company not found');
        }
        return result.rows[0];
    },

    async updateCompany({ id, user_id, name, description, location, website }) {
        const company = await query('SELECT * FROM companies WHERE id = $1', [id]);
        if (company.rowCount === 0) {
            throw new NotFoundError('Company not found');
        }

        if (company.rows[0].user_id !== user_id) {
            throw new AuthorizationError('You are not authorized to update this company');
        }

        const result = await query(
            'UPDATE companies SET name = $1, description = $2, location = $3, website = $4 WHERE id = $5 RETURNING *',
            [name, description, location, website, id]
        );

        return result.rows[0];
    },

    async deleteCompany({ id, user_id }) {
        const company = await query('SELECT * FROM companies WHERE id = $1', [id]);
        if (company.rowCount === 0) {
            throw new NotFoundError('Company not found');
        }

        if (company.rows[0].user_id !== user_id) {
            throw new AuthorizationError('You are not authorized to delete this company');
        }

        await query('DELETE FROM companies WHERE id = $1', [id]);
    },
};

export default CompanyService;