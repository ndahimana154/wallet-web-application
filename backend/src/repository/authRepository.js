import User from "../database/models/users.js";
import Session from "../database/models/sessions.js";

const saveSession = (sessionData) => {
    return Session.create(sessionData);
};

const getUserOTP = (otp) => {
    return Session.findOne({ content: otp });
};

const updateUserSession = (userId, content) => {
    return Session.findOneAndUpdate(
        { userId },
        { content: content },
        { new: true, upsert: false }
    );
};

const findUserById = async (userId) => {
    return await User.findById(userId);
}
const findOneUser = async () => {
    return await User.findOne();
}
const findUserByAttribute = async (key, value) => {
    const user = await User.findOne({ [key]: value });
    return user;
}


const findSessionBy2Attributes = async (key1, value1, key2, value2) => {
    const session = await Session.findOne({ [key1]: value1, [key2]: value2 });
    return session;
}
const findSessionByToken = async (token) => {
    return Session.findOne({ content: token })
}

const updateUser = async (_id, data) => {
    const updatedUser = await User.findByIdAndUpdate(_id, data, { new: true });
    return updatedUser;
}
const deleteSession = async (_id) => {
    await Session.findByIdAndDelete(_id);
}

export default {
    findUserByAttribute,
    saveSession,
    findSessionBy2Attributes,
    findUserById,
    updateUser,
    deleteSession,
    saveSession,
    deleteSession,
    getUserOTP,
    updateUserSession,
    findSessionByToken,
    findOneUser
}
