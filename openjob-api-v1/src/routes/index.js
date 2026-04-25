import { Router } from "express";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";
import companyRoutes from "./companyRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import jobRoutes from "./jobRoutes.js";
import applicationRoutes from "./applicationRoutes.js";
import bookmarkRoutes from "./bookmarkRoutes.js";
import profileRoutes from "./profileRoutes.js";

const router = Router();

router.get('/', (req, res) => {
    res.json({ status: 'success', message: 'OpenJob API is running' });
});

router.use(userRoutes);
router.use(authRoutes);
router.use(companyRoutes);
router.use(categoryRoutes);
router.use(jobRoutes);
router.use(applicationRoutes);
router.use(bookmarkRoutes);
router.use(profileRoutes);

export default router;