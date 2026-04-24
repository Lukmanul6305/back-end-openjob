import UserService from "../services/UserService.js";

const UserHandler = {
    async register(req, res, next) {
        try {
            const { name, email, password, role } = req.body;
            const user = await UserService.register({ name, email, password, role });

            return res.status(201).json({
                status: 'success',
                message: 'User registered successfully',
                data: { user },
            });
        } catch (err) {
            next(err);
        }
    },

    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);

            return res.status(200).json({
                status: 'success',
                message: 'User fetched successfully',
                data: { user },
            });
        } catch (err) {
            next(err);
        }
    },
};

export default UserHandler;