import { Component } from '@angular/core';
import { DefaultInputComponent, FormService, KeycommandsService } from '@ec.components/ui';
import { SdkService } from '../sdk/sdk.service';

/** This component holds the input templates for all field types that can not be represented by the default input template. */
@Component({
  templateUrl: './default-entry-input.component.html',
})
export class DefaultEntryInputComponent extends DefaultInputComponent {
  constructor(public sdk: SdkService, public formService: FormService, public keycommands: KeycommandsService) {
    super(formService, keycommands);
  }
}
