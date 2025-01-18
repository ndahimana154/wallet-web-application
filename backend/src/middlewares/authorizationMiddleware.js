import httpStatus from "http-status";
import authRepository from "../modules/auth/repository/authRepository.js";
import { decodeToken } from "../helpers/authHelpers.js";


export const isUserAuthorized = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                message: "No token provided",
            });
        }

        const decoded = await decodeToken(token);
        const session = await authRepository.findSessionByToken(
            token
        );
        if (!session) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                message: "Session expired !",
            });
        }
        const user = await authRepository.findUserById(decoded.id);

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                message: "User not found!",
            });
        }

        req.user = user;
        req.session = session;
        return next();
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

