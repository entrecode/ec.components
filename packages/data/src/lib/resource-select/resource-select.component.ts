import {
    ChangeDetectorRef, Component, ElementRef, forwardRef,
    Input, OnChanges, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Form, Item } from '@ec.components/core';
import { PopComponent, SelectComponent, SymbolService } from '@ec.components/ui';
import Core from 'ec.sdk/lib/Core';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import Resource from 'ec.sdk/lib/resources/Resource';
import { AuthService } from '../auth/auth.service';
import { CrudConfig } from '../crud/crud-config.interface';
import { ResourceConfig } from '../resource-config/resource-config.service';
import { ResourceListPopComponent } from '../resource-list-pop/resource-list-pop.component';
import { ResourceListComponent } from '../resource-list/resource-list.component';
import { ResourcePopComponent } from '../resource-pop/resource-pop.component';
/** Shows resources of a selection and is able to pick new ones from a crud list
*/

@Component({
    selector: 'ec-resource-select',
    templateUrl: './resource-select.component.html',
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
    @ViewChild('dropdown') dropdown: PopComponent;
    /** The nested resource list in the dropdown */
    @ViewChild('dropdownList') dropdownList: ResourceListComponent;
    /** The nested resource pop for editing and creating */
    @ViewChild(ResourcePopComponent) resourcePop: ResourcePopComponent;
    /** The nested resource list pop */
    @ViewChild(ResourceListPopComponent) resourceListPop: ResourceListPopComponent;
    /** The config of the dropdown pop */
    dropdownConfig: CrudConfig<Resource>;

    constructor(
        protected resourceConfig: ResourceConfig,
        protected auth: AuthService,
        public elementRef: ElementRef,
        public symbol: SymbolService,
        public cdr: ChangeDetectorRef
    ) {
        super(elementRef, cdr);
    }

    ngOnInit() {
        this.init();
    }

    ngOnChanges() {
        this.init();
    }

    togglePop(e) {
        if (this.dropdown && this.config && !this.config.disableSearchbar) {
            this.dropdown.show(e);
        } else if (this.resourceListPop && this.config && !this.config.disableListPop) {
            this.resourceListPop.show(e);
        } else if (this.resourcePop && !this.config.disableCreatePop) {
            this.resourcePop.show();
        }
        this.focusSearchbar();
    }

    defaultPlaceholder() {
        if (this.config && this.config.disableSearchbar && this.config.disableListPop) {
            return this.symbol.resolve('resource.select.placeholder.new');
        }
        return this.symbol.resolve('resource.select.placeholder.select');
    }

    /** Calls super.useConfig and then creates special dropdownConfig with just entryTitle as field  */
    useConfig(config: CrudConfig<Resource> = {}) {
        super.useConfig(config);
        this.dropdownConfig = Object.assign({}, this.config, {
            fields: {
                [this.config.label]: Object.assign({}, this.config.fields[this.config.label])
            }
        });
        if (config.methods) {
            this.useMethods(config.methods);
        } else {
            this.auth.getAllowedResourceMethods(this.relation) // init permissions
                .then((methods) => this.useMethods(methods));
        }
        this.selection.update$.subscribe(change => {
            if (this.solo && !this.selection.isEmpty()) { // update permissions for selected item
                this.auth.getAllowedResourceMethods(this.relation, { [this.config.identifier]: this.selection.getValue() })
                    .then((methods) => this.useMethods(methods));
            }
        });
    }

    /** Is called when a selected item is clicked. Either outputs itemClick (if subscribed) or opens the edit pop if puttable. */
    clickItem(item, e) {
        if (this.itemClick.observers.length) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return this.itemClick.emit(item);
        }
        if (!this.solo && this.hasMethod('put')) {
            this.editItem(item, e);
        }
    }

    useMethods(methods) {
        this.config.methods = methods;
        this.cdr.markForCheck();
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
        if (this.config) {
            this.useConfig(this.config);
            return;
        }
        this.config = <CrudConfig<Resource>>Object.assign(this.resourceConfig.get(this.relation)/* , { size: 5 } */,
            this.crudConfig, { solo: this.solo, selectMode: false, disableSelectSwitch: true } as CrudConfig<Resource>);
        this.useConfig(this.config);
    }

    /** Is called when the nested resource-form has been saved. Selects the fresh resource and clears the form */
    formSubmitted(form: Form<EntryResource>) {
        if (!this.selection.has(form)) {
            this.toggleItem.next(form);
        } else { // already in selection => update body
            const index = this.selection.index(form);
            this.selection.items[index].body = form.getBody();
        }
    }

    pasteValue(e) {
        const value = (e.clipboardData).getData('text');
        if (this.config.identifierPattern && value.match(this.config.identifierPattern)) {
            this.preventDefault(e);
            this.api.resource(this.relation, value)
                .then(resource => this.addItem(new Item(resource, this.config)))
                .catch(error => this.searchbar.filterList(value));
        }
    }

    /** Is called when a selected item has been clicked. */
    editItem(item: Item<Resource>, e) {
        this.auth.getAllowedResourceMethods(this.relation, { [this.config.identifier]: item.id() })
            .then(methods => {
                if (methods.indexOf('put') === -1) {
                    console.log('cannote put');
                    return;
                }
                this.resourcePop.edit(item.getBody(), { methods });
            });
    }

    onChange() {
        super.onChange();
        if (this.hasSoloSelection() && this.resourceListPop) {
            this.resourceListPop.hide();
            return;
        }
    }

    focusSearchbar() {
        if (!this.resourceListPop || !this.resourceListPop.active) {
            this.searchbar.focusEvent.emit(true);
        }
    }
}
