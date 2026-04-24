import CategoryService from "../services/CategoryService.js";

const CategoryHandler = {
    async createCategory(req, res, next) {
        try {
            const { name } = req.body;
            const category = await CategoryService.createCategory({ name });

            return res.status(201).json({
                status: 'success',
                message: 'Category created successfully',
                data: { category },
            });
        } catch (err) {
            next(err);
        }
    },

    async getAllCategories(req, res, next) {
        try {
            const categories = await CategoryService.getAllCategories();

            return res.status(200).json({
                status: 'success',
                message: 'Categories fetched successfully',
                data: { categories },
            });
        } catch (err) {
            next(err);
        }
    },

    async getCategoryById(req, res, next) {
        try {
            const { id } = req.params;
            const category = await CategoryService.getCategoryById(id);

            return res.status(200).json({
                status: 'success',
                message: 'Category fetched successfully',
                data: { category },
            });
        } catch (err) {
            next(err);
        }
    },

    async updateCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const category = await CategoryService.updateCategory({ id, name });

            return res.status(200).json({
                status: 'success',
                message: 'Category updated successfully',
                data: { category },
            });
        } catch (err) {
            next(err);
        }
    },

    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            await CategoryService.deleteCategory(id);

            return res.status(200).json({
                status: 'success',
                message: 'Category deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },
};

export default CategoryHandler;