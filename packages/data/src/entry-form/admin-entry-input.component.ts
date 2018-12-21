import { SdkService } from '../sdk/sdk.service';
import { Component } from '@angular/core';
import { DefaultInputComponent } from '@ec.components/ui/src/form/default-input/default-input.component';
import DataManagerResource from 'ec.sdk/lib/resources/datamanager/DataManagerResource';

/** This component holds the input templates for all field types that require having the DatamanagerResource as api.
 * This is currently relevant for account and role fields which come from the ec.api.
 */
@Component({
    templateUrl: './admin-entry-input.component.html',
})
export class AdminEntryInputComponent extends DefaultInputComponent {
    api: DataManagerResource;
    constructor(public sdk: SdkService) {
        super();
        /* this.sdk.root.then((root) => this.api = root); */
    }
}
