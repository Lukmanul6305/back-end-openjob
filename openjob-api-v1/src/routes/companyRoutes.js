import { Router } from "express";
import CompanyHandler from "../handlers/CompanyHandler.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { CompanySchema } from "../validators/CompanyValidator.js";

const router = Router();

// Public
router.get('/companies', CompanyHandler.getAllCompanies);
router.get('/companies/:id', CompanyHandler.getCompanyById);

// Protected
router.post('/companies', authMiddleware, validationMiddleware(CompanySchema), CompanyHandler.createCompany);
router.put('/companies/:id', authMiddleware, validationMiddleware(CompanySchema), CompanyHandler.updateCompany);
router.delete('/companies/:id', authMiddleware, CompanyHandler.deleteCompany);

export default router;