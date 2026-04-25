import { Router } from "express";
import ProfileHandler from "../handlers/ProfileHandler.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// All protected
router.get('/profile', authMiddleware, ProfileHandler.getProfile);
router.get('/profile/applications', authMiddleware, ProfileHandler.getProfileApplications);
router.get('/profile/bookmarks', authMiddleware, ProfileHandler.getProfileBookmarks);

export default router;