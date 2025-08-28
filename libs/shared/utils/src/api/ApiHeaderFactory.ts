import AuthStorage from '../auth/AuthStorage';

class ApiHeaderFactory {
    static headers(): Headers {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('app-id', 'laiwan');
        
        const token = AuthStorage.getToken();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }

        return headers;
    }
}

export default ApiHeaderFactory;