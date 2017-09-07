import { CookieService } from 'ngx-cookie';
export declare class AuthorizationService {
    private cookie;
    token: string;
    constructor(cookie: CookieService);
    setToken(token: any): void;
    clearToken(): void;
    getToken(): string;
    authorized(): boolean;
    unauthorized(): boolean;
    catchError(err: any): void;
}
