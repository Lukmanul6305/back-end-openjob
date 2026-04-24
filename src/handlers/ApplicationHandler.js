import ApplicationService from "../services/ApplicationService.js";

const ApplicationHandler = {
    async createApplication(req, res, next) {
        try {
            const { job_id, cover_letter } = req.body;
            const user_id = req.user.id;

            const application = await ApplicationService.createApplication({ user_id, job_id, cover_letter });

            return res.status(201).json({
                status: 'success',
                message: 'Application submitted successfully',
                data: { application },
            });
        } catch (err) {
            next(err);
        }
    },

    async getAllApplications(req, res, next) {
        try {
            const applications = await ApplicationService.getAllApplications();

            return res.status(200).json({
                status: 'success',
                message: 'Applications fetched successfully',
                data: { applications },
            });
        } catch (err) {
            next(err);
        }
    },

    async getApplicationById(req, res, next) {
        try {
            const { id } = req.params;
            const application = await ApplicationService.getApplicationById(id);

            return res.status(200).json({
                status: 'success',
                message: 'Application fetched successfully',
                data: { application },
            });
        } catch (err) {
            next(err);
        }
    },

    async getApplicationsByUserId(req, res, next) {
        try {
            const { userId } = req.params;
            const applications = await ApplicationService.getApplicationsByUserId(userId);

            return res.status(200).json({
                status: 'success',
                message: 'Applications fetched successfully',
                data: { applications },
            });
        } catch (err) {
            next(err);
        }
    },

    async getApplicationsByJobId(req, res, next) {
        try {
            const { jobId } = req.params;
            const applications = await ApplicationService.getApplicationsByJobId(jobId);

            return res.status(200).json({
                status: 'success',
                message: 'Applications fetched successfully',
                data: { applications },
            });
        } catch (err) {
            next(err);
        }
    },

    async updateApplicationStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const user_id = req.user.id;

            const application = await ApplicationService.updateApplicationStatus({ id, user_id, status });

            return res.status(200).json({
                status: 'success',
                message: 'Application status updated successfully',
                data: { application },
            });
        } catch (err) {
            next(err);
        }
    },

    async deleteApplication(req, res, next) {
        try {
            const { id } = req.params;
            const user_id = req.user.id;

            await ApplicationService.deleteApplication({ id, user_id });

            return res.status(200).json({
                status: 'success',
                message: 'Application deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },
};

export default ApplicationHandler;