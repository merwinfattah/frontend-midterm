import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const apiGet = axios.create({
    baseURL: "https://backend-midterm-production.up.railway.app/api"
});