import axios from "axios";

const BASE_URL = process.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
