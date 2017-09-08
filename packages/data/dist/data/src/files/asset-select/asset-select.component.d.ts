/**
 * Created by felix on 23.05.17.
 */
import { OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Field } from '@ec.components/core/src/field/field';
import { Item } from '@ec.components/core/src/item/item';
import { FileService, Upload } from '../file.service';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { SelectComponent } from '@ec.components/ui/src/form/select/select.component';
import PublicAssetResource from 'ec.sdk/src/resources/publicAPI/PublicAssetResource';
/** Shows assets of a selection and is able to pick new ones from a crud list */
export declare class AssetSelectComponent extends SelectComponent<PublicAssetResource> implements OnInit {
    private fileService;
    /** The formControl that is used. */
    formControl: FormControl;
    /** The value that should be prefilled */
    value: Array<PublicAssetResource | string>;
    /** The used field, which should contain a model property (when not using model input) */
    field: Field<PublicAssetResource>;
    /** The form group that is used */
    protected group: FormGroup;
    /** The form control that is used */
    protected control: FormControl;
    /** The used item */
    item: Item<any>;
    /** The model to pick from, alternative to field with model property set. */
    model: string;
    /** The asset list pop with the list to select from */
    pop: PopComponent;
    constructor(fileService: FileService);
    initValue(value?: (string | PublicAssetResource)[]): void;
    ngOnInit(): void | Promise<void>;
    select(item: Item<any>): void;
    toggle(active?: boolean, emit?: boolean): void;
    canToggle(): boolean;
    selectUpload(upload: Upload): void;
    editItem(item: any): void;
}
