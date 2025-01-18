import axiosInstance from "../axios/axiosInstance";
import { handleError } from "./authRequests"

export const createNewAccount = async (data) => {
    try {
        const response = await axiosInstance.post("/api/v1/account/new", data)
        return response.data
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
}

export const getAccounts = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/account/all");
        return response.data
    } catch (error) {
        const handledError = handleError(error)
        return handledError
    }
}