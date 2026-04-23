import { Router } from "express";
import userRoutes from "./userRoutes.js";

const router = Router();

router.get('/', (req, res) => {
    res.json({ status: 'success', message: 'OpenJob API is running' });
});

router.use(userRoutes);

export default router;