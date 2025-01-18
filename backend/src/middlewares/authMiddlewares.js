import { comparePassword } from "../helpers/authHelpers.js";
import authRepository from "../repository/authRepository.js";
import httpStatus from "http-status";

export const isPassworValid = async (req, res, next) => {
    const { password } = req.body;
    const userPassword = req.user.password;
    if (!(await comparePassword(password, userPassword))) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .json({ status: httpStatus.BAD_REQUEST, message: "Incorect password!" });
    }

    return next();
};

export const isUserExistsByEmail = async (req, res, next) => {
    try {
        const user = await authRepository.findUserByAttribute("email", req.body.email);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        req.user = user;
        return next();
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}

export const isUserExistsById = async (req, res, next) => {
    try {
        const user = await authRepository.findUserByAttribute("_id", req.body.userId);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        req.user = user;
        return next();
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}

export const isOTPValid = async (req, res, next) => {
    try {
        const session = await authRepository.findSessionBy2Attributes("userId", req.body.userId, "content", req.body.OTP);
        if (!session) {
            return res.status(400).json({
                status: 400,
                message: "Invalid OTP!"
            });
        }

        req.session = session;
        return next()
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}