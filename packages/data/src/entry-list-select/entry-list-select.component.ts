import { Component, OnInit, ViewEncapsulation, forwardRef, Input, OnChanges, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Selection, ListConfig, Form } from '@ec.components/core';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { ModelConfigService } from '../model-config/model-config.service';
import { CrudConfig } from '../crud/crud-config.interface';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { ListComponent, InputComponent } from '@ec.components/ui';
import LiteEntryResource from 'ec.sdk/lib/resources/publicAPI/LiteEntryResource';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
@Component({
    selector: 'ec-entry-list-select',
    templateUrl: './entry-list-select.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EntryListSelectComponent),
            multi: true
        }
    ]
})

export class EntryListSelectComponent extends InputComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() model: string;
    @Input() selection: Selection<EntryResource>;
    @Input() listConfig: CrudConfig<EntryResource>;
    entryListConfig: CrudConfig<EntryResource>;
    @ViewChild(EntryListComponent) entryList: EntryListComponent;
    items: EntryResource[];
    @Input() selectionConfig: ListConfig<LiteEntryResource>
    value = [];

    constructor(
        public modelConfig: ModelConfigService,
        public symbol: SymbolService,
        public componentFactoryResolver: ComponentFactoryResolver
    ) {
        super(componentFactoryResolver)
    }

    ngOnInit() {
        this.init();
    }

    ngOnChanges() {
        /*    this.init(); */
    }


    init() {
        if (this.field && !this.model) {
            this.model = this.field.relation;
        }
        if (this.model) {
            this.modelConfig.generateConfig(this.model, (this.listConfig || {}).fields)
                .then(config => {
                    this.listConfig = config;
                    this.selectionConfig = Object.assign({}, this.listConfig, {
                        disableHeader: false,
                        hidePagination: true,
                        fields: Object.assign({},
                            {
                                button: {
                                    label: ' ',
                                    form: false,
                                    resolve: () => ' ',
                                    view: 'link',
                                    class: 'btn btn_clear',
                                    icon: 'trash',
                                    action: (item, property) => {
                                        this.selection.remove(item);
                                    }
                                }
                            },
                            this.listConfig.fields,
                            {
                                _modified: Object.assign({},
                                    config.fields._modified,
                                    { hideInList: true }
                                ),
                            })
                    });
                    Object.keys(this.selectionConfig.fields).forEach(key => {
                        if (this.selectionConfig.fields[key].type !== 'text') {
                            this.selectionConfig.fields[key].filterable = false;
                        }
                    });
                    this.initSelection();
                });
        }
    }



    initSelection(config = this.listConfig) {
        this.selection = this.selection || new Selection(this.value, config);
        this.items = this.selection.items.map(item => item.getBody());
        this.selection.update$.subscribe(() => {
            this.items = this.selection.items.map(item => item.getBody());
            this.propagateChange(this.selection.getValue());
        });
    }


    /** Is called when the nested entry-form has been saved. Selects the fresh entry and clears the form */
    formSubmitted(form: Form<EntryResource>) {
        if (!this.selection.has(form)) {
            this.selection.add(form);
        } else { // already in selection => update body
            const index = this.selection.index(form);
            this.selection.items[index].body = form.getBody();
        }
    }

    removeItem(item) {
        this.selection.remove(item);
    }


    /** Called when the model changes */
    writeValue(value: any) {
        this.value = value;
        if (this.selection) {
            this.selection.replaceWith(value);
        }
    }

    /** Propagates formControl/ngModel changes */
    propagateChange = (_: any) => {
    };
    /** registers change method. (handled by angular) */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {
    }
}
