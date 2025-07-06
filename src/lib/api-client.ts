import axios from "axios";
import type { AxiosInstance, AxiosError } from "axios";
import toast from "react-hot-toast";
import type { AxiosRequestConfig } from "axios";

interface RetryConfig {
  retries?: number;
  retryDelay?: number;
  retryCondition?: (error: unknown) => boolean;
}

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "https://foras.co.il",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add any request modifications here
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // If no response or no originalRequest, reject immediately
        if (!error.response || !originalRequest) {
          this.handleError(error);
          return Promise.reject(error);
        }

        // Handle 401 errors
        if (error.response.status === 401 && !originalRequest._retry) {
          // Skip refresh for auth endpoints to prevent loops
          if (originalRequest.url?.includes("/api/auth/")) {
            return Promise.reject(error);
          }

          if (this.isRefreshing) {
            // If already refreshing, queue this request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(() => this.client(originalRequest));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            // Try to refresh token
            await this.refreshToken();
            this.processQueue(null);

            // Retry the original request
            return this.client(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError);
            // Only redirect to home if not already there
            if (window.location.pathname !== "/") {
              window.location.href = "/";
            }
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Handle other errors
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: unknown) {
    this.failedQueue.forEach((prom) => {
      if (error instanceof Error) {
        prom.reject(error);
      } else {
        prom.reject(new Error("Unknown error occurred"));
      }
    });
    this.failedQueue = [];
  }

  private async refreshToken() {
    try {
      // Use a direct axios call to avoid interceptor loops
      const response = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL || "https://foras.co.il"
        }/api/auth/refresh`,
        {},
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  private handleError(error: any) {
    // Don't show toast for auth check requests
    if (error.config?.url?.includes("/api/user/me")) {
      return;
    }

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          toast.error(data.message || "طلب غير صالح");
          break;
        case 403:
          toast.error("ليس لديك صلاحية للقيام بهذا الإجراء");
          break;
        case 404:
          toast.error("المورد المطلوب غير موجود");
          break;
        case 422:
          // Handle validation errors
          Object.values(data.errors).forEach((err: unknown) => {
            if (typeof err === "string") toast.error(err);
          });

          break;
        case 500:
          toast.error("حدث خطأ في الخادم، يرجى المحاولة لاحقاً");
          break;
        default:
          if (status !== 401) {
            // Don't show for 401 as it's handled by refresh
            toast.error(data.message || "حدث خطأ غير متوقع");
          }
      }
    } else if (error.request) {
      toast.error("لا يوجد اتصال بالإنترنت");
    } else {
      toast.error("حدث خطأ في الطلب");
    }
  }

  // Retry wrapper
  async withRetry<T>(
    fn: () => Promise<T>,
    config: RetryConfig = {}
  ): Promise<T> {
    const {
      retries = 3,
      retryDelay = 1000,
      retryCondition = (error: unknown) => {
        if (axios.isAxiosError(error)) {
          return !error.response || error.response.status >= 500;
        }
        return false;
      },
    } = config;

    let lastError: any = null;

    for (let i = 0; i <= retries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;

        if (i === retries || !retryCondition(lastError)) {
          throw lastError;
        }

        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay * (i + 1))
        );
      }
    }

    throw lastError;
  }

  // Public methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
