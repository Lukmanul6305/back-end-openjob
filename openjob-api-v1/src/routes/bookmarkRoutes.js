import { Router } from "express";
import BookmarkHandler from "../handlers/BookmarkHandler.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// Protected
router.post('/jobs/:jobId/bookmark', authMiddleware, BookmarkHandler.createBookmark);
router.get('/jobs/:jobId/bookmark/:id', authMiddleware, BookmarkHandler.getBookmarkById);
router.delete('/jobs/:jobId/bookmark', authMiddleware, BookmarkHandler.deleteBookmark);
router.get('/bookmarks', authMiddleware, BookmarkHandler.getAllBookmarks);

export default router;