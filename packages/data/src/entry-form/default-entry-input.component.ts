import { Component } from '@angular/core';
import { DefaultInputComponent } from '@ec.components/ui/src/form/default-input/default-input.component';
import { nestedCrudConfig } from '../model-config/nested-crud-config';
import { CrudConfig } from '../crud/crud-config.interface';
import EntryResource from 'ec.sdk/src/resources/publicAPI/EntryResource';

/** This component holds the input templates for all field types that can not be represented by the default input template. */
@Component({
  templateUrl: './default-entry-input.component.html',
})
export class DefaultEntryInputComponent extends DefaultInputComponent {
  entrySelectConfig: CrudConfig<EntryResource> = nestedCrudConfig;
}
