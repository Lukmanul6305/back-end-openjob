import { Router } from "express";
import AuthHandler from "../handlers/AuthHandler.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { LoginSchema, RefreshTokenSchema, LogoutSchema } from "../validators/AuthValidator.js";

const router = Router();

// Public
router.post('/authentications', validationMiddleware(LoginSchema), AuthHandler.login);
router.put('/authentications', validationMiddleware(RefreshTokenSchema), AuthHandler.refresh);

// Protected
router.delete('/authentications', authMiddleware, validationMiddleware(LogoutSchema), AuthHandler.logout);

export default router;