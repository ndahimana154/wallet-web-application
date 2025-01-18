import httpStatus from "http-status"
import { generateToken } from "../helpers/authHelpers.js";
import authRepository from "../repository/authRepository.js";

const userLogin = async (req, res) => {
    try {
        const token = await generateToken(req.user._id);
        const session = await authRepository.saveSession({
            userId: req.user._id,
            content: token
        })

        res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "User authenticated successfully",
            token,
            session
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            status: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
}

export default {
    userLogin
}