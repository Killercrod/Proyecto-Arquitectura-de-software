import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
export const API_URL = "http://localhost:3000/api/v1";
let axiosInstance: AxiosInstance;

// Customizes every HTTP request to the back (e.g. the bearer token)
const createAxios = (baseURL: string) => {
    axiosInstance = axios.create({ baseURL });
};

const setupInterceptors = (): void => {
    // Requests
    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.set("Authorization", `Bearer ${token}`);
            }
            console.log(`Request to: ${config.url}`);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Responses
    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            console.log(`Response from: ${response.config.url}`, {
                data: response.data,
                status: response.status,
            });
            return response;
        },
        (error) => {
            if (error.response) {
                console.error(`Error response from: ${error.response.config.url}`);
            } else {
                console.error(`Error: ${error.message}`);
            }
            return Promise.reject(error);
        }
    );
};

export const initAxios = () => {
    createAxios(API_URL);
    setupInterceptors();
    return axiosInstance;
};

export const apiAxios = initAxios();

// import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

// let axiosInstance: AxiosInstance;
// // para personalizar las peticiones http al back
// // ejem por ejemplo el bearer
// const createAxios = (baseURL: string) => {
//     axiosInstance = axios.create({baseURL})
// }

// const setupInterceptors = (): void => {
//     // para peticiones
//     axiosInstance.interceptors.request.use(
//         (config: InternalAxiosRequestConfig) => {
//             const token = localStorage.getItem("token");
//             if (token) {
//                 config.headers.set(`Authorization Bearer: ${token}`)
//             }
//             console.log(`peticion hecha por: ${config.url}`);
//             if (error.response) {
//                 console.error(`Error response from: ${error.response.config.url}`);
//             } else {
//                 console.error(`Error: ${error.message}`);
//             }
//             return config;
//         },
//         (error) => {
//             return Promise.reject(error);
//         }
//     );

//     axiosInstance.interceptors.response.use(
//         (response: AxiosResponse) => {
//             console.log(`Response from: ${response.config.url}`, {
//                 data: response.data,
//                 status: response.status,
//             });
//             return response;
//         }, (error) => {
//             if (error.response) {
//                 console.error(`Error response from: ${error.response.config.url}`)
//             } {
//                 console.error(`Error: ${error.message}`)
//             }
//             return Promise.reject(error)
//         }
//     )
// }

// export const initAxios = () => {
//   createAxios('https://rickandmortyapi.com/api'); //import.meta.env.VITE_API_URL
//   setupInterceptors();
//   return axiosInstance
// }

// export const apiAxios = initAxios();