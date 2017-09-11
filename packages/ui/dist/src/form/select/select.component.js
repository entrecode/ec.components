"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const core_2 = require("@ec.components/core");
/**
 * The SelectComponent will render a dropdown of a given list.
 * */
class SelectComponent {
    constructor() {
        /** Event emitter on item selection */
        this.change = new core_1.EventEmitter();
        /** Event emitter on selected item click */
        this.itemClick = new core_1.EventEmitter();
        /** Event that emits when the plus is clicked. */
        this._toggle = new core_1.EventEmitter();
        this.propagateChange = (_) => {
        };
    }
    /** is emitted when a new value has been written from the outside */
    // written: EventEmitter<any> = new EventEmitter();
    ngOnInit() {
        this.initSelection();
    }
    ngOnChanges() {
        this.initSelection();
    }
    /** creates the collection from the config */
    initSelection() {
        if (!this.config || this.config.disableSelection) {
            return;
        }
        this.selection = new core_2.Selection(this.value || [], this.config);
        this.selection.update$.subscribe(() => {
            this.changed();
        });
    }
    /** Called when the model changes */
    writeValue(value) {
        this.value = Array.isArray(value) ? value : (value ? [value] : []);
        Object.assign(this.config || {}, { solo: this.solo });
        this.list = new core_2.List(this.value, this.config);
        if (this.selection && this.value && this.value.length) {
            Object.assign(this.config, { selection: this.selection });
            this.selection.replaceWith(this.list.items);
        }
    }
    /** Initializes either with values, collection or list. Creates Selection with config. */
    useConfig(config = {}) {
        this.config = Object.assign(this.config || {}, config);
        this.initSelection();
        this.writeValue(this.value);
    }
    /** Returns true if the toggle button should be shown.
     * Is hidden when all items are selection and the toggle output has no observers. */
    canToggle() {
        return this._toggle.observers.length || !this.selection.hasAll(this.list.items);
    }
    /** Called when clicking the toggle button. emits toggle event with current selection. */
    toggle(active = !this.active, emit = false) {
        this.active = active;
        this._toggle.emit(this.selection);
    }
    /** Is called when a selected item is clicked*/
    clickItem(item) {
        this.itemClick.emit(item);
    }
    /** Column click handler. Triggers onSelect.emit(item) with fallback to selection.toggle*/
    columnClick(item) {
        if (this.selection) {
            this.selection.toggle(item);
        }
    }
    addItem(item) {
        this.selection.toggle(item);
        this.changed();
    }
    removeItem(item) {
        this.selection.remove(item);
        this.changed();
    }
    changed() {
        this.change.emit(this.selection);
        return this.propagateChange(this.selection.getValue());
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() {
    }
}
SelectComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-select',
                templateUrl: './select.component.html',
                styleUrls: ['./select.component.scss'],
                encapsulation: core_1.ViewEncapsulation.None,
                providers: [
                    {
                        provide: forms_1.NG_VALUE_ACCESSOR,
                        useExisting: core_1.forwardRef(() => SelectComponent),
                        multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
SelectComponent.ctorParameters = () => [];
SelectComponent.propDecorators = {
    'config': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
    'selection': [{ type: core_1.Input },],
    'change': [{ type: core_1.Output },],
    'itemClick': [{ type: core_1.Output },],
    '_toggle': [{ type: core_1.Output, args: ['toggle',] },],
    'list': [{ type: core_1.Input },],
    'active': [{ type: core_1.Input },],
    'solo': [{ type: core_1.Input },],
};
exports.SelectComponent = SelectComponent;
//# sourceMappingURL=select.component.js.map