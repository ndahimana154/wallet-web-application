import httpSStatus from "http-status";
import accountRepository from "../repository/accountRepository.js";
import transactionsRepository from "../repository/transactionsRepository.js";

const recordTransaction = async (req, res) => {
    try {
        const type = req.body.type;
        if (type === "Deposit") {
            const newAccBalance = req.account.balance + req.body.amount;
            console.log(newAccBalance);
            const updatedAccount = await accountRepository.updateAccount(req.account._id, { balance: newAccBalance });

            const transaction = await transactionsRepository.saveTransaction({
                account: req.account._id,
                type,
                amount: req.body.amount,
                oldAccBalance: req.account.balance,
                newAccBalance,
                description: req.body.description,
                category: req.body.category
            })
            return res.status(httpSStatus.OK).json({
                status: httpSStatus.OK,
                message: "Transaction recorded successfully",
                updatedAccount,
                transaction
            });
        }
        else if (type === "Withdrawal") {
            // Logic for withdrawal transaction
        }
    } catch (error) {
        res.status(httpSStatus.INTERNAL_SERVER_ERROR).json({
            status: httpSStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
}

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionsRepository.findAllTransactions();
        return res.status(httpSStatus.OK).json({
            status: httpSStatus.OK,
            message: "Transactions retrieved successfully",
            transactions,
        })
    } catch (error) {
        res.status(httpSStatus.INTERNAL_SERVER_ERROR).json({
            status: httpSStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        })
    }
}
export default {
    recordTransaction,
    getAllTransactions
}