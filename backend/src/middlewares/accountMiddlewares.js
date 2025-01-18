import httpStatus from "http-status";

import accountRepository from "../repository/accountRepository.js";

export const isAccountArleadyExists = async (req, res, next) => {
    try {
        const account = await accountRepository.findAccountByAttributes("name", req.body.name, "accNumber", req.body.accNumber);
        if (account) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: "User already exists"
            })
        }
        return next()
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

export const isAccountExists = async (req, res, next) => {
    try {
        const account = await accountRepository.findAccountByAttribute("_id", req.body.account);
        if (!account) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: "Account not found"
            })
        }
        req.account = account;
        return next();
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        })
    }
}