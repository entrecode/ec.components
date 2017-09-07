import { DefaultInputComponent } from '@ec.components/ui/src/form/default-input/default-input.component';
import { CrudConfig } from '../crud/crud-config.interface';
import EntryResource from 'ec.sdk/src/resources/publicAPI/EntryResource';
/** This component holds the input templates for all field types that can not be represented by the default input template. */
export declare class DefaultEntryInputComponent extends DefaultInputComponent {
    entrySelectConfig: CrudConfig<EntryResource>;
}
