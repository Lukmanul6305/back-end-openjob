import { Router } from "express";
import UserHandler from "../handlers/UserHandler.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import { RegisterUserSchema } from "../validators/UserValidator.js";

const router = Router();

router.post('/users', validationMiddleware(RegisterUserSchema), UserHandler.register);
router.get('/users/:id', UserHandler.getUserById);

export default router;