import CompanyService from "../services/CompanyService.js";

const CompanyHandler = {
    async createCompany(req, res, next) {
        try {
            const { name, description, location, website } = req.body;
            const user_id = req.user.id;

            const company = await CompanyService.createCompany({ user_id, name, description, location, website });

            return res.status(201).json({
                status: 'success',
                message: 'Company created successfully',
                data: { company },
            });
        } catch (err) {
            next(err);
        }
    },

    async getAllCompanies(req, res, next) {
        try {
            const companies = await CompanyService.getAllCompanies();

            return res.status(200).json({
                status: 'success',
                message: 'Companies fetched successfully',
                data: { companies },
            });
        } catch (err) {
            next(err);
        }
    },

    async getCompanyById(req, res, next) {
        try {
            const { id } = req.params;
            const company = await CompanyService.getCompanyById(id);

            return res.status(200).json({
                status: 'success',
                message: 'Company fetched successfully',
                data: { company },
            });
        } catch (err) {
            next(err);
        }
    },

    async updateCompany(req, res, next) {
        try {
            const { id } = req.params;
            const { name, description, location, website } = req.body;
            const user_id = req.user.id;

            const company = await CompanyService.updateCompany({ id, user_id, name, description, location, website });

            return res.status(200).json({
                status: 'success',
                message: 'Company updated successfully',
                data: { company },
            });
        } catch (err) {
            next(err);
        }
    },

    async deleteCompany(req, res, next) {
        try {
            const { id } = req.params;
            const user_id = req.user.id;

            await CompanyService.deleteCompany({ id, user_id });

            return res.status(200).json({
                status: 'success',
                message: 'Company deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    },
};

export default CompanyHandler;