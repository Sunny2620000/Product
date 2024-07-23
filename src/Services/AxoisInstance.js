import axios from "axios";
const AxiosInstance = axios.create({
     //baseURL: "https://jsonplaceholder.typicode.com/",
     baseURL: "http://127.0.0.1:8000/api/",
    // timeout: 1000,
    headers: {
         'Content-Type': 'application/json' 
        }
})

export default AxiosInstance