import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

  constructor(private auth: AuthorizationService) {
    super();
    // Set the default 'Content-Type' header
    this.headers.set('Content-Type', 'application/json');
  }

  merge(options?: RequestOptionsArgs): RequestOptions {
    const newOptions = super.merge(options);
    const token = this.auth.getToken();
    if (token) {
      newOptions.headers.set('Authorization', `Bearer ${token}`);
    } else {
      newOptions.headers.delete('Authorization');
    }
    return newOptions;
  }
}

export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions };