import { Router } from "express";
import AuthHandler from "../handlers/AuthHandler.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { LoginSchema, RefreshTokenSchema } from "../validators/AuthValidator.js";

const router = Router();

router.post('/authentications', validationMiddleware(LoginSchema), AuthHandler.login);
router.put('/authentications', validationMiddleware(RefreshTokenSchema), AuthHandler.refresh);
router.delete('/authentications', authMiddleware, AuthHandler.logout);

export default router;