import { AxiosInstance, AxiosResponse } from "axios";
import { PaginatedResponse } from "@shared/types";

export class BaseService<T> {
    private readonly client: AxiosInstance;
    private readonly basePath: string;

    constructor(client: AxiosInstance, basePath: string) {
        this.client = client;
        this.basePath = basePath;

        this.validateClient();
    }

    private validateClient(): void {
        if (!this.client) {
            throw new Error("Axios client instance is missing.");
        }
    }

    private async request<U>(
        method: 'get' | 'post' | 'put' | 'delete',
        url: string,
        data?: any,
        config?: Record<string, any>
    ): Promise<U> {
        try {
            const response: AxiosResponse<U> = await this.client.request({
                method,
                url,
                data,
                ...config,
            });
            return response.data;
        } catch (error) {
            console.error(`Error during ${method.toUpperCase()} request to ${url}:`, error);
            throw error;
        }
    }

    getAll(params: Record<string, any> = {}): Promise<PaginatedResponse<T>> {
        return this.request<PaginatedResponse<T>>('get', this.basePath, undefined, { params });
    }

    getOne(id: string | number): Promise<T> {
        return this.request<T>('get', `${this.basePath}/${id}`);
    }

    create(data: Partial<T>): Promise<T> {
        return this.request<T>('post', this.basePath, data);
    }

    update(id: string | number, data: Partial<T>): Promise<T> {
        return this.request<T>('put', `${this.basePath}/${id}`, data);
    }

    delete(id: string | number): Promise<void> {
        return this.request<void>('delete', `${this.basePath}/${id}`);
    }
}
