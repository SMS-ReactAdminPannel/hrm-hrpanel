import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const backEndUrl: string = "http://localhost:3002";

const Axios = axios.create({
    baseURL:backEndUrl,
    timeout:5000000,
    headers:{
        "Content-Type":"application/json",
    }

});

// Request interceptor to attach auth token
Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers["Authorization"] = token;
  }

  return config;
});

// Response interceptor to handle session expiration
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response &&
      error.response.status === 401 &&
      error.response.data?.status === "session_expired"
    ) {
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);

class HttpClient {
  async get<T = any>(url: string, params?: any): Promise<AxiosResponse<T>> {
    const response = await Axios.get<T>(url, {
      params,
    });
    return response;
  }

  async post<T = any>(url: string, data: any): Promise<AxiosResponse<T>> {
    const response = await Axios.post<T>(url, data);
    return response;
  }

  async update<T = any>(url: string, data: any, params?: any): Promise<T> {
    const response = await Axios.put<T>(url, data, {
      params,
    });
    return response.data;
  }

  async delete<T = any>(url: string): Promise<T> {
    const response = await Axios.delete<T>(url);
    return response.data;
  }

  async fileGet(url: string): Promise<AxiosResponse<Blob>> {
    const response = await Axios.get(url, {
      responseType: "blob",
    });
    return response;
  }
}

export default new HttpClient();