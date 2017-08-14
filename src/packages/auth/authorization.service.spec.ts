import { inject, TestBed } from '@angular/core/testing';
import { CookieModule } from 'ngx-cookie';

import { AuthorizationService } from './authorization.service';

describe('AuthorizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationService],
      imports: [CookieModule.forRoot()]
    });
  });

  it('should ...', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));
});
