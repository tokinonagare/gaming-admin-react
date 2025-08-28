import ApiHeaderFactory from './ApiHeaderFactory';
import AuthStorage from '../auth/AuthStorage';

interface RequestConfig {
    path: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Headers;
    body?: any;
}

interface ApiResponse {
    ok: boolean;
    message?: string;
    result?: any;
    errors?: Array<{ message: string }>;
    error_message?: string;
}

class BaseApi {
    private apiDomain: string;

    constructor(apiDomain: string) {
        this.apiDomain = apiDomain;
    }

    request = async (config: RequestConfig): Promise<any> => {
        const {
            path,
            method = 'GET',
            headers = ApiHeaderFactory.headers(),
            body,
        } = config;

        if (typeof body === 'undefined') {
            headers.delete('Content-Type');
        }

        const url = `${this.apiDomain}${path}`.replace(/([^:]\/)\/+/g, '$1');
        return fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        })
            .then(this.parseStatusCode)
            .then(this.parseResponse);
    };

    private parseStatusCode = (response: Response): Promise<ApiResponse> => {
        if (response.status === 401) {
            AuthStorage.clear();
            throw new Error('登录已过期，请重新登录');
        }
        if (response.status === 200) {
            return response.json();
        }
        throw new Error(`HTTP Error: ${response.status}`);
    };

    private parseResponse = (response: ApiResponse): any => {
        const {
            ok, message, result, errors, error_message,
        } = response;
        if (!ok) {
            throw new Error(message || errors?.[0]?.message || error_message);
        }
        return result;
    };
}

export default BaseApi;