import { query } from "../config/database.js";
import { randomUUID } from "crypto";
import NotFoundError from "../exceptions/NotFoundError.js";
import ClientError from "../exceptions/ClientError.js";

const CategoryService = {
    async createCategory({ name }) {
        const check = await query('SELECT id FROM categories WHERE name = $1', [name]);
        if (check.rowCount > 0) {
            throw new ClientError('Category name already exists', 400);
        }

        const id = `category-${randomUUID()}`;
        const result = await query(
            'INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING *',
            [id, name]
        );

        return result.rows[0];
    },

    async getAllCategories() {
        const result = await query('SELECT * FROM categories ORDER BY created_at DESC');
        return result.rows;
    },

    async getCategoryById(id) {
        const result = await query('SELECT * FROM categories WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            throw new NotFoundError('Category not found');
        }
        return result.rows[0];
    },

    async updateCategory({ id, name }) {
        const check = await query('SELECT id FROM categories WHERE id = $1', [id]);
        if (check.rowCount === 0) {
            throw new NotFoundError('Category not found');
        }

        const result = await query(
            'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );

        return result.rows[0];
    },

    async deleteCategory(id) {
        const check = await query('SELECT id FROM categories WHERE id = $1', [id]);
        if (check.rowCount === 0) {
            throw new NotFoundError('Category not found');
        }

        await query('DELETE FROM categories WHERE id = $1', [id]);
    },
};

export default CategoryService;