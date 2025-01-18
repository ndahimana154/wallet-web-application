import Account from "../database/models/accounts.js"

const findAccountByAttributes = async (key1, value1, key2, value2) => {
    return Account.findOne({ [key1]: value1, [key2]: value2 })
}

const saveAccount = async (data) => {
    const account = new Account(data);
    return account.save();
};

const findallAccounts = async () => {
    return Account.find();
}

const findAccountByAttribute = async (key, value) => {
    return Account.findOne({ [key]: value })
}

const updateAccount = async (_id, data) => {
    return Account.findByIdAndUpdate(_id, data, { new: true })
}

export default {
    findAccountByAttributes,
    saveAccount,
    findallAccounts,
    findAccountByAttribute,
    updateAccount
}