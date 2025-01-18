import htttpStatus from "http-status";
import accountRepository from "../repository/accountRepository.js";

const createNewAccount = async (req, res) => {
    try {
        const account = await accountRepository.saveAccount(req.body);
       
        return res.status(htttpStatus.CREATED).json({
            status: htttpStatus.CREATED,
            message: "Account created successfully",
            account
        })
    } catch (error) {
        res.status(htttpStatus.INTERNAL_SERVER_ERROR).json({
            status: htttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const getAllAccounts = async (req, res) => {
    try {
        const accounts = await accountRepository.findallAccounts()
        return res.status(htttpStatus.OK).json({
            status: htttpStatus.OK,
            message: "Accounts retrieved successfully",
            accounts
        })
    } catch (error) {
        res.status(htttpStatus.INTERNAL_SERVER_ERROR).json({
            status: htttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

export default {
    createNewAccount,
    getAllAccounts
}