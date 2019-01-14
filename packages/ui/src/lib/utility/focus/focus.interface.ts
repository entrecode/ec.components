import { EventEmitter } from '@angular/core';

export interface Focus {
  focusEvent: EventEmitter<boolean>;

  ngAfterViewInit();
}
