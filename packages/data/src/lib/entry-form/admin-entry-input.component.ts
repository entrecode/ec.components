import { SdkService } from '../sdk/sdk.service';
import { Component } from '@angular/core';
import { DefaultInputComponent, FormService, KeycommandsService } from '@ec.components/ui';
import DataManagerResource from 'ec.sdk/lib/resources/datamanager/DataManagerResource';

/** This component holds the input templates for all field types that require having the DatamanagerResource as api.
 * This is currently relevant for account and role fields which come from the ec.api.
 */
@Component({
  templateUrl: './admin-entry-input.component.html',
})
export class AdminEntryInputComponent extends DefaultInputComponent {
  api: DataManagerResource;
  constructor(public sdk: SdkService, public formService: FormService, public keycommands: KeycommandsService) {
    super(formService, keycommands);
  }
}
