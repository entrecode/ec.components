import { Http } from '@angular/http';
import { AuthorizationService } from './authorization.service';
export declare class PublicAuthService {
    private agent;
    private auth;
    private headers;
    private options;
    constructor(agent: Http, auth: AuthorizationService);
    useToken(token: string): void;
    hasToken(): boolean;
    authorized: () => boolean;
    clearToken(): void;
    logout: () => void;
    login(data: any): void;
    signup(data: any): void;
}
