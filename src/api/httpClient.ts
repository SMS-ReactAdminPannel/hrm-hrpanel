// httpClient.ts
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const backEndUrl = "http://localhost:3002";

const Axios = axios.create({
  baseURL: backEndUrl,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

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
  hr: any;
  async get<T = any>(url: string, params?: any): Promise<T> {
    const response = await Axios.get<T>(url,{
      params,
    } );
    return response.data;
  }

  async post<T = any>(url: string, data: any): Promise<T> {
    const response = await Axios.post<T>(url, data);
    return response.data;
  }

  async put<T = any>(url: string, data: any, params?: any): Promise<T> {
    const response = await Axios.put<T>(url, data, { params });
    return response.data;
  }

  async patch<T = any>(url: string, data: any): Promise<T> {
    const response = await Axios.patch<T>(url, data);
    return response.data;
  }

  async delete<T = any>(url: string): Promise<T> {
    const response = await Axios.delete<T>(url);
    return response.data;
  }

  async fileGet(url: string): Promise<AxiosResponse<Blob>> {
    return Axios.get(url, {
      responseType: "blob",
    });
  }
}

export default new HttpClient();
