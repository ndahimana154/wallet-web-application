import Transaction from "../database/models/transactions.js";

const saveTransaction = async (data) => {
    const transaction = new Transaction(data);
    return transaction.save();
}

const findAllTransactions = async () => {
    return Transaction.find().populate("account");
}

export default {
    saveTransaction,
    findAllTransactions
}