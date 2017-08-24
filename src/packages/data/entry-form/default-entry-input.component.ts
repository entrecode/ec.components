import { Component } from '@angular/core';
import { DefaultInputComponent } from '../../ui/form/default-input/default-input.component';
import { nestedCrudConfig } from '../model-config/nested-crud-config';

/** This component holds the input templates for all field types that can not be represented by the default input template. */
@Component({
  templateUrl: './default-entry-input.component.html',
})
export class DefaultEntryInputComponent extends DefaultInputComponent {
  entrySelectConfig = nestedCrudConfig;
}
