import { BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { AuthorizationService } from './authorization.service';
export declare class DefaultRequestOptions extends BaseRequestOptions {
    private auth;
    constructor(auth: AuthorizationService);
    merge(options?: RequestOptionsArgs): RequestOptions;
}
export declare const requestOptionsProvider: {
    provide: typeof RequestOptions;
    useClass: typeof DefaultRequestOptions;
};
