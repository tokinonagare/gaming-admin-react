const STORAGE_KEYS = {
    TOKEN: 'auth_token',
    USERNAME: 'auth_username',
    USER_ID: 'auth_user_id',
    PERMISSIONS: 'auth_permissions',
} as const;

class AuthStorage {
    static isVerified(): boolean {
        return Boolean(this.getToken());
    }

    static getToken(): string | null {
        return localStorage.getItem(STORAGE_KEYS.TOKEN);
    }

    static setToken(token: string): void {
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    }

    static getUsername(): string | null {
        return localStorage.getItem(STORAGE_KEYS.USERNAME);
    }

    static setUsername(username: string): void {
        localStorage.setItem(STORAGE_KEYS.USERNAME, username);
    }

    static getUserId(): string | null {
        return localStorage.getItem(STORAGE_KEYS.USER_ID);
    }

    static setUserId(userId: string): void {
        localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    }

    static getPermissions(): string[] {
        const permissions = localStorage.getItem(STORAGE_KEYS.PERMISSIONS);
        return permissions ? JSON.parse(permissions) : [];
    }

    static setPermissions(permissions: string[]): void {
        localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(permissions));
    }

    static setAuth(data: {
        token: string;
        username: string;
        userId: string;
        permissions?: string[];
    }): void {
        this.setToken(data.token);
        this.setUsername(data.username);
        this.setUserId(data.userId);
        if (data.permissions) {
            this.setPermissions(data.permissions);
        }
    }

    static clear(): void {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    }

    static hasPermission(permission: string): boolean {
        const permissions = this.getPermissions();
        return permissions.includes(permission);
    }
}

export default AuthStorage;