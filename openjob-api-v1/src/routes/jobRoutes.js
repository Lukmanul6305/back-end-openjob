import { Router } from "express";
import JobHandler from "../handlers/JobHandler.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { JobSchema } from "../validators/JobValidator.js";

const router = Router();

// Public
router.get('/jobs', JobHandler.getAllJobs);
router.get('/jobs/company/:companyId', JobHandler.getJobsByCompanyId);
router.get('/jobs/category/:categoryId', JobHandler.getJobsByCategoryId);
router.get('/jobs/:id', JobHandler.getJobById);

// Protected
router.post('/jobs', authMiddleware, validationMiddleware(JobSchema), JobHandler.createJob);
router.put('/jobs/:id', authMiddleware, validationMiddleware(JobSchema), JobHandler.updateJob);
router.delete('/jobs/:id', authMiddleware, JobHandler.deleteJob);

export default router;