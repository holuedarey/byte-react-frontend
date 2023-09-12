// httpInterceptor.js
import axios from 'axios';
// import AppData from "../../config/appData.json";
// import { useNavigate } from "react-router-dom";


// const navigate = useNavigate();
// Create an Axios instance with default configurations
const httpClient = axios.create({
    baseURL: "http://16.170.207.247:5006/api/v1/", // Replace with your API base URL
});

// Add request interceptor
httpClient.interceptors.request.use(
    (config) => {
        // You can modify the request config here (e.g., add headers, authentication tokens)
        const jwtToken = localStorage.getItem('token');
        //decrpt the token to knowif it has expire
        if (jwtToken === null) {
            // navigate("/");
            console.log("Invalid Token or expire    ")
        }
        config.headers["Authorization"] = jwtToken;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
httpClient.interceptors.response.use(
    (response) => {
        // You can modify the response data here
        return response;
    },
    (error) => {
        // You can handle error responses here (e.g., show error messages)
        console.log("response", error?.response?.status);
        const status = error?.response?.status;
        if (status === 401) {
            window.location.href = '/';
            console.log("Expired Token");
        } else if (status >= 500) {
            console.log("Server Error");
        }

        return Promise.reject(error);
    }
);

export default httpClient;