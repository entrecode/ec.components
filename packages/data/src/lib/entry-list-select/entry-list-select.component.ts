import {
    Component, OnInit, ViewEncapsulation, forwardRef,
    Input, OnChanges, ViewChild, ComponentFactoryResolver, ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Selection, ListConfig, Form } from '@ec.components/core';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { ModelConfigService } from '../model-config/model-config.service';
import { CrudConfig } from '../crud/crud-config.interface';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { InputComponent, SymbolService } from '@ec.components/ui';
import LiteEntryResource from 'ec.sdk/lib/resources/publicAPI/LiteEntryResource';

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
/** Renders a Selection inside a list with full crud support. It can act as a replacement for ec-entry-select. */
export class EntryListSelectComponent extends InputComponent implements ControlValueAccessor, OnInit, OnChanges {
    /** The model that is picked from */
    @Input() model: string;
    /** The selection that should be edited */
    @Input() selection: Selection<EntryResource>;
    /** The config for the entry list */
    @Input() listConfig: CrudConfig<EntryResource>;
    /** The nested entryList */
    @ViewChild(EntryListComponent) entryList: EntryListComponent;
    /** The current selected entries */
    items: EntryResource[];
    /** The config for the selection list. */
    @Input() selectionConfig: ListConfig<LiteEntryResource>;
    /** The current value of the input */
    value = [];

    constructor(
        public modelConfig: ModelConfigService,
        public symbol: SymbolService,
        public componentFactoryResolver: ComponentFactoryResolver,
        public cdr: ChangeDetectorRef
    ) {
        super(componentFactoryResolver);
    }

    /** Calls init */
    ngOnInit() {
        this.init();
    }

    ngOnChanges() {
        /*    this.init(); */
    }

    /** Initializes the input. Reads relation from field. Generates model config + adds remove buttons. */
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
                        defaultFilter: false,
                        hidePagination: true,
                        fields: Object.assign({},
                            this.listConfig.fields,
                            {
                                _modified: Object.assign({},
                                    config.fields._modified,
                                    { hideInList: true }
                                ),
                            },
                            {
                                button: {
                                    label: this.symbol.resolve('entry.select.remove'),
                                    form: false,
                                    resolve: () => ' ',
                                    view: 'link',
                                    class: 'btn btn_clear',
                                    icon: 'close-x',
                                    action: (item, property) => {
                                        this.selection.remove(item);
                                    }
                                }
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

    /** Initializes the selection with listConfig. Propagates change */
    initSelection(config = this.listConfig) {
        this.selection = this.selection || new Selection(this.value, config);
        this.items = this.selection.items.map(item => item.getBody());
        this.cdr.markForCheck();
        this.selection.update$.subscribe(() => {
            this.items = this.selection.items.map(item => item.getBody());
            this.propagateChange(this.selection.getValue());
            this.cdr.markForCheck();
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

    /** Removes the given item from the selection */
    removeItem(item) {
        this.selection.remove(item);
    }

    /** Called when the model changes */
    writeValue(value: any) {
        this.value = value || [];
        if (this.selection) {
            this.selection.replaceWith(this.value);
        }
    }

    /** Propagates formControl/ngModel changes */
    propagateChange = (_: any) => {
    }
    /** registers change method. (handled by angular) */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {
    }
}
