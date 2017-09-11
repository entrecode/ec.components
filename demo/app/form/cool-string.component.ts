import { Component } from '@angular/core';
import { DefaultInputComponent } from '../../../packages/ui/src/form/default-input/default-input.component';

@Component({
  selector: 'ec-cool-string',
  template: require('./cool-string.component.html'),
})
export class CoolStringComponent extends DefaultInputComponent {
}
