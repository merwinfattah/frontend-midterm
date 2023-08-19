import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const apiGet = axios.create({
    baseURL: "http://localhost:8080/api"
});