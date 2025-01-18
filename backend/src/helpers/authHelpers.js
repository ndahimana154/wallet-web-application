import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const { sign } = jwt;

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
};

export const generateToken = async (id) => {
    return sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const decodeToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET)
};
