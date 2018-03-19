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
import { ResourceConfig } from '../resource-config/resource-config.service';
import { Form } from '@ec.components/core';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { ResourcePopComponent } from '../resource-pop/resource-pop.component';
import { AuthService } from '../auth/auth.service';
import { SdkService } from '@ec.components/data';
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
    /** The config that is being generated. */
    public config: CrudConfig<Resource>;
    /** Wether or not the selection should be solo */
    @Input() solo: boolean;
    /** The config that should be merged into the generated config */
    // tslint:disable-next-line:no-input-rename
    @Input('config') crudConfig: CrudConfig<Resource>;
    /** The crud pop with the list to select from */
    @ViewChild('crudPop') pop: PopComponent;
    /** The config of the dropdown pop */
    dropdownConfig: CrudConfig<Resource>;

    constructor(private resourceConfig: ResourceConfig,
        private auth: AuthService,
        private sdk: SdkService,
    ) {
        super();
    }

    ngOnInit() {
        this.init()
    }

    ngOnChanges() {
        this.init()
    }

    /** Calls super.useConfig and then creates special dropdownConfig with just entryTitle as field  */
    useConfig(config: CrudConfig<Resource> = {}) {
        super.useConfig(config);
        this.dropdownConfig = Object.assign({}, this.config, {
            fields: {
                [this.config.label]: Object.assign({}, this.config.fields[this.config.label])
            }
        });
        this.auth.getAllowedResourceMethods(this.relation, {}, null, this.sdk.session)
            .then((methods) => {
                this.config.methods = methods
            });
    }

    /** Returns true if the given method is part of the methods array (or if there is no methods array) */
    public hasMethod(method: string) {
        return this.config && this.config.methods && this.config.methods.indexOf(method) !== -1;
    }

    /** Inits the select with api, relation and config setup */
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
        this.config = Object.assign(this.resourceConfig.config[this.relation], { size: 10 },
            this.crudConfig, { solo: this.solo, selectMode: true, disableSelectSwitch: true });
        this.useConfig(this.config);
    }

    /** Returns the pop class that should be used, either uses config.popClass or defaults to ec-pop_dialog. */
    getPopClass() {
        return this.config && this.config.popClass ? this.config.popClass : 'ec-pop_dialog';
    }
    /** Is called when the nested resource-form has been saved. Selects the fresh resource and clears the form */
    formSubmitted(form: Form<EntryResource>, resourcePop: ResourcePopComponent) {
        this.select(form);
        resourcePop.form.create();
    }
}
