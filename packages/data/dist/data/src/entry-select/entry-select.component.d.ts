import { FormControl, FormGroup } from '@angular/forms';
import { Field } from '@ec.components/core/src/field/field';
import { CrudComponent } from '../crud/crud.component';
import { ModelConfigService } from '../model-config/model-config.service';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { Item } from '@ec.components/core/src/item/item';
import { CrudConfig } from '../crud/crud-config.interface';
import { SelectComponent } from '@ec.components/ui/src/form/select/select.component';
import EntryResource from "ec.sdk/src/resources/publicAPI/EntryResource";
/** Shows entries of a selection and is able to pick new ones from a crud list */
export declare class EntrySelectComponent extends SelectComponent<EntryResource> {
    private modelConfig;
    /** The field for which the input is meant. */
    field: Field<any>;
    /** The item that is targeted by the input */
    protected item: Item<any>;
    /** The form group that is used */
    protected group: FormGroup;
    /** The form control that is used */
    protected control: FormControl;
    /** The formControl that is used. */
    formControl: FormControl;
    /** The value that should be prefilled */
    value: Array<EntryResource>;
    /** The model to pick from, alternative to field with model property set. */
    model: string;
    /** The ec-crud inside the view template */
    crud: CrudComponent<EntryResource>;
    /** The config that is being generated. */
    config: CrudConfig<EntryResource>;
    /** Wether or not the selection should be solo */
    solo: boolean;
    /** The config that should be merged into the generated config */
    crudConfig: CrudConfig<EntryResource>;
    /** The crud pop with the list to select from */
    pop: PopComponent;
    constructor(modelConfig: ModelConfigService);
    ngOnChanges(): void;
    select(item: Item<EntryResource>): void;
    toggle(active?: boolean, emit?: boolean): void;
    canToggle(): boolean;
    /** Is called when a selected item has been clicked. */
    editItem(item: any): void;
    /** Returns pop class for entry picker, defaults to no class. */
    getPopClass(): string;
}
