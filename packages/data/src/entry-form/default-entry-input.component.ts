import { Component } from '@angular/core';
import { DefaultInputComponent } from '@ec.components/ui/src/form/default-input/default-input.component';
import { SdkService } from '../sdk/sdk.service';

/** This component holds the input templates for all field types that can not be represented by the default input template. */
@Component({
  templateUrl: './default-entry-input.component.html',
})
export class DefaultEntryInputComponent extends DefaultInputComponent {
  constructor(public sdk: SdkService) {
    super();
  }
}
