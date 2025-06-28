// src/lib/api-client.ts
import axios from 'axios';
import toast from 'react-hot-toast';

interface RetryConfig {
  retries?: number;
  retryDelay?: number;
  retryCondition?: (error: any) => boolean;
}

class APIClient {
  private client: Axios.AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: any) => {
        // Add timestamp to prevent caching
        if (config.method === 'get') {
          config.params = {
            ...config.params,
            _t: Date.now(),
          };
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(() => this.client(originalRequest))
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            // Try to refresh token
            await this.refreshToken();
            this.processQueue(null);
            return this.client(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError);
            window.location.href = '/';
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

  private processQueue(error: any) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve();
      }
    });
    this.failedQueue = [];
  }

  private async refreshToken() {
    // Implement token refresh logic
    return this.client.post('/api/auth/refresh');
  }

  private handleError(error: any) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          toast.error(data.message || 'طلب غير صالح');
          break;
        case 403:
          toast.error('ليس لديك صلاحية للقيام بهذا الإجراء');
          break;
        case 404:
          toast.error('المورد المطلوب غير موجود');
          break;
        case 422:
          // Handle validation errors
          if (data.errors) {
            Object.values(data.errors).forEach((err: any) => {
              toast.error(err as string);
            });
          }
          break;
        case 500:
          toast.error('حدث خطأ في الخادم، يرجى المحاولة لاحقاً');
          break;
        default:
          toast.error(data.message || 'حدث خطأ غير متوقع');
      }
    } else if (error.request) {
      toast.error('لا يوجد اتصال بالإنترنت');
    } else {
      toast.error('حدث خطأ في الطلب');
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
      retryCondition = (error: any) => {
        return !error.response || error.response.status >= 500;
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

        await new Promise((resolve) => setTimeout(resolve, retryDelay * (i + 1)));
      }
    }

    throw lastError;
  }

  // Public methods
  async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  async upload<T>(url: string, formData: FormData, onProgress?: (progress: number) => void): Promise<T> {
    const response = await this.client.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...(onProgress && {
        onUploadProgress: (progressEvent: any) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        },
      }),
    });
    return response.data;
  }
}

export const apiClient = new APIClient();

// Export the original axios instance if needed
export { axios };