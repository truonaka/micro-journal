import axios from "axios";
import { normalizeApiError } from "./appError";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8801"
});

apiClient.interceptors.response.use(
    response => response,
    error => Promise.reject(normalizeApiError(error))
);

export default apiClient;