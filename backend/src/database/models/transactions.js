import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    oldAccBalance: {
        type: Number,
        required: true
    },
    newAccBalance: {
        type: Number,
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accounts",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Transaction = mongoose.model("Transactions", transactionSchema)

export default Transaction;