import ProfileService from "../services/ProfileService.js";

const ProfileHandler = {
    async getProfile(req, res, next) {
        try {
            const user_id = req.user.id;
            const user = await ProfileService.getProfile(user_id);

            return res.status(200).json({
                status: 'success',
                message: 'Profile fetched successfully',
                data: { user },
            });
        } catch (err) {
            next(err);
        }
    },

    async getProfileApplications(req, res, next) {
        try {
            const user_id = req.user.id;
            const applications = await ProfileService.getProfileApplications(user_id);

            return res.status(200).json({
                status: 'success',
                message: 'Profile applications fetched successfully',
                data: { applications },
            });
        } catch (err) {
            next(err);
        }
    },

    async getProfileBookmarks(req, res, next) {
        try {
            const user_id = req.user.id;
            const bookmarks = await ProfileService.getProfileBookmarks(user_id);

            return res.status(200).json({
                status: 'success',
                message: 'Profile bookmarks fetched successfully',
                data: { bookmarks },
            });
        } catch (err) {
            next(err);
        }
    },
};

export default ProfileHandler;