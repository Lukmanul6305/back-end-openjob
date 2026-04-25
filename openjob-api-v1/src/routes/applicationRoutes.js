import { Router } from "express";
import ApplicationHandler from "../handlers/ApplicationHandler.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { ApplicationSchema, UpdateApplicationSchema } from "../validators/ApplicationValidator.js";

const router = Router();

// Protected
router.post('/applications', authMiddleware, validationMiddleware(ApplicationSchema), ApplicationHandler.createApplication);
router.get('/applications', authMiddleware, ApplicationHandler.getAllApplications);
router.get('/applications/user/:userId', authMiddleware, ApplicationHandler.getApplicationsByUserId);
router.get('/applications/job/:jobId', authMiddleware, ApplicationHandler.getApplicationsByJobId);
router.get('/applications/:id', authMiddleware, ApplicationHandler.getApplicationById);
router.put('/applications/:id', authMiddleware, validationMiddleware(UpdateApplicationSchema), ApplicationHandler.updateApplicationStatus);
router.delete('/applications/:id', authMiddleware, ApplicationHandler.deleteApplication);

export default router;