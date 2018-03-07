import { OnInit } from '@angular/core';
/**
 * Created by felix on 23.05.17.
 */
import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field } from '@ec.components/core/src/field/field';
import { CrudComponent } from '../crud/crud.component';
import { ModelConfigService } from '../model-config/model-config.service';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { Item } from '@ec.components/core/src/item/item';
import { CrudConfig } from '../crud/crud-config.interface';
import { SelectComponent } from '@ec.components/ui';
import Core from 'ec.sdk/lib/Core';
import Resource from 'ec.sdk/lib/resources/Resource';
import { resourceConfig } from '../resource-config/resource-config';
/** Shows resources of a selection and is able to pick new ones from a crud list
*/

@Component({
    selector: 'ec-resource-select',
    templateUrl: './resource-select.component.html',
    styleUrls: ['../../../ui/src/select/select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ResourceSelectComponent),
            multi: true
        }
    ]
})
export class ResourceSelectComponent extends SelectComponent<Resource> implements OnChanges, OnInit {
    /** The field for which the input is meant. */
    @Input() field: Field;
    /** The item that is targeted by the input */
    protected item: Item<any>;
    /** The form group that is used */
    protected group: FormGroup;
    /** The form control that is used */
    protected control: FormControl;
    /** The formControl that is used. */
    @Input() formControl: FormControl;
    /** The value that should be prefilled */
    @Input() value: Array<Resource>;
    /** The relation of the resource. */
    @Input() relation: string;
    /** The api to use */
    @Input() api: Core;
    /** The ec-crud inside the view template */
    @ViewChild('crud') crud: CrudComponent<Resource>;
    /** The config that is being generated. */
    public config: CrudConfig<Resource>;
    /** Wether or not the selection should be solo */
    @Input() solo: boolean;
    /** The config that should be merged into the generated config */
    // tslint:disable-next-line:no-input-rename
    @Input('config') crudConfig: CrudConfig<Resource>;
    /** The crud pop with the list to select from */
    @ViewChild('crudPop') pop: PopComponent;
    /*
        constructor(private modelConfig: ModelConfigService) {
            super();
        } */

    ngOnInit() {
        this.init()
    }

    ngOnChanges() {
        this.init()
    }

    init() {
        if (!this.api || !this.relation) {
            return;
        }
        if (!this.formControl) {
            this.formControl = new FormControl(this.value || []);
        }
        if (this.field) {
            this.relation = this.relation || this.field['relation'];
        }
        if (this.config) {
            super.useConfig(this.config);
            return;
        }
        this.config = Object.assign(resourceConfig[this.relation], { size: 10 },
            this.crudConfig, { solo: this.solo, selectMode: true, disableSelectSwitch: true });
        this.useConfig(this.config);
    }
}
