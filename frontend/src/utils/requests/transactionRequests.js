import axiosInstance from "../axios/axiosInstance";
import { handleError } from "./authRequests"

export const createTransaction = async (data) => {
    try {
        const response = await axiosInstance.post("/api/v1/transaction/new", data);
        return response.data;
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
}

export const getTransactions = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/transaction/all");
        return response.data;
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
}