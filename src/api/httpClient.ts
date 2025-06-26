import axios, { type AxiosInstance, type AxiosResponse } from "axios";

const BASE_URL = "http://localhost:3002";

class HttpClient {
  private axiosInstance: AxiosInstance;
  hr: any;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 50000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Automatically attach token if available
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = token;
      }
      return config;
    });
  }

  
  async get<T = any>(url: string, params?: any): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { params });
    return response.data;
  }

  async post<T = any>(url: string, data: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  async put<T = any>(url: string, data: any, params?: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, { params });
    return response.data;
  }

  async patch<T = any>(url: string, data: any): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data);
    return response.data;
  }

  async delete<T = any>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url);
    return response.data;
  }

  async fileGet(url: string): Promise<AxiosResponse<Blob>> {
    return this.axiosInstance.get(url, {
      responseType: "blob",
    });
  }
}

export default new HttpClient();
