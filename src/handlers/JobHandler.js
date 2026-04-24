import JobService from "../services/JobService.js";

const JobHandler = {
    async createJob(req, res, next) {
        try {
            const { company_id, category_id, title, description, type, salary_min, salary_max } = req.body;
            const user_id = req.user.id;

            const job = await JobService.createJob({ company_id, category_id, title, description, type, salary_min, salary_max });

            return res.status(201).json({
                status: 'success',
                message: 'Job created successfully',
                data: { job },
            });
        } catch (err) {
            next(err);
        }
    },

    async getAllJobs(req, res, next) {
        try {
            const { title, 'company-name': companyName } = req.query;
            const jobs = await JobService.getAllJobs({ title, companyName });

            return res.status(200).json({
                status: 'success',
                message: 'Jobs fetched successfully',
                data: { jobs },
            });
        } catch (err) {
            next(err);
        }
    },

    async getJobById(req, res, next) {
        try {
            const { id } = req.params;
            const job = await JobService.getJobById(id);

            return res.status(200).json({
                status: 'success',
                message: 'Job fetched successfully',
                data: { job },
            });
        } catch (err) {
            next(err);
        }
    },

    async getJobsByCompanyId(req, res, next) {
        try {
            const { companyId } = req.params;
            const jobs = await JobService.getJobsByCompanyId(companyId);

            return res.status(200).json({
                status: 'success',
                message: 'Jobs fetched successfully',
                data: { jobs },
            });
        } catch (err) {
            next(err);
        }
    },

    async getJobsByCategoryId(req, res, next) {
        try {
            const { categoryId } = req.params;
            const jobs = await JobService.getJobsByCategoryId(categoryId);

            return res.status(200).json({
                status: 'success',
                message: 'Jobs fetched successfully',
                data: { jobs },
            });
        } catch (err) {
            next(err);
        }
    },

    async updateJob(req, res, next) {
        try {
            const { id } = req.params;
            const { company_id, category_id, title, description, type, salary_min, salary_max } = req.body;
            const user_id = req.user.id;

            const job = await JobService.updateJob({ id, user_id, company_id, category_id, title, description, type, salary_min, salary_max });

            return res.status(200).json({
                status: 'success',
                message: 'Job updated successfully',
                data: { job },
            });
        } catch (err) {
            next(err);
        }
    },

    async deleteJob(req, res, next) {
        try {
            const { id } = req.params;
            const user_id = req.user.id;

            await JobService.deleteJob({ id, user_id });

            return res.status(200).json({
                status: 'success',
                message: 'Job deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },
};

export default JobHandler;