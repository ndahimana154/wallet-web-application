import axiosInstance from "../axios/axiosInstance";

export const handleError = (error) => {
    if (error.response) {
        return {
            status: error.response.status,
            message:
                error.response.data.message ||
                "Something went wrong. Please try again.",
        };
    }
    return {
        status: 500,
        message: error.message || "Unexpected error occurred. Please try again.",
    };
};

export const userLogin = async (data) => {
    try {
        const response = await axiosInstance.post('/api/v1/auth/login', data);
        return response.data;
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
}
