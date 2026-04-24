import BookmarkService from "../services/BookmarkService.js";

const BookmarkHandler = {
    async createBookmark(req, res, next) {
        try {
            const { jobId } = req.params;
            const user_id = req.user.id;

            const bookmark = await BookmarkService.createBookmark({ user_id, job_id: jobId });

            return res.status(201).json({
                status: 'success',
                message: 'Bookmark created successfully',
                data: { bookmark },
            });
        } catch (err) {
            next(err);
        }
    },

    async getAllBookmarks(req, res, next) {
        try {
            const user_id = req.user.id;
            const bookmarks = await BookmarkService.getAllBookmarks({ user_id });

            return res.status(200).json({
                status: 'success',
                message: 'Bookmarks fetched successfully',
                data: { bookmarks },
            });
        } catch (err) {
            next(err);
        }
    },

    async getBookmarkById(req, res, next) {
        try {
            const { id } = req.params;
            const user_id = req.user.id;

            const bookmark = await BookmarkService.getBookmarkById({ id, user_id });

            return res.status(200).json({
                status: 'success',
                message: 'Bookmark fetched successfully',
                data: { bookmark },
            });
        } catch (err) {
            next(err);
        }
    },

    async deleteBookmark(req, res, next) {
        try {
            const { jobId } = req.params;
            const user_id = req.user.id;

            await BookmarkService.deleteBookmark({ user_id, job_id: jobId });

            return res.status(200).json({
                status: 'success',
                message: 'Bookmark deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },
};

export default BookmarkHandler;