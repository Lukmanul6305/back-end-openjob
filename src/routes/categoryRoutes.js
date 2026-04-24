import { Router } from "express";
import CategoryHandler from "../handlers/CategoryHandler.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { CategorySchema } from "../validators/CategoryValidator.js";

const router = Router();

// Public
router.get('/categories', CategoryHandler.getAllCategories);
router.get('/categories/:id', CategoryHandler.getCategoryById);

// Protected
router.post('/categories', authMiddleware, validationMiddleware(CategorySchema), CategoryHandler.createCategory);
router.put('/categories/:id', authMiddleware, validationMiddleware(CategorySchema), CategoryHandler.updateCategory);
router.delete('/categories/:id', authMiddleware, CategoryHandler.deleteCategory);

export default router;