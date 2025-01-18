import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    accNumber: {
        type: String,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
}, {timestamps: true})

const Account = mongoose.model('Accounts', accountSchema)

export default Account;