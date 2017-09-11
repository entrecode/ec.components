"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by felix on 23.05.17.
 */
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const model_config_service_1 = require("../model-config/model-config.service");
const select_component_1 = require("@ec.components/ui/src/form/select/select.component");
// import LiteEntryResource from "ec.sdk/src/resources/publicAPI/LiteEntryResource";
/** Shows entries of a selection and is able to pick new ones from a crud list */
class EntrySelectComponent extends select_component_1.SelectComponent {
    constructor(modelConfig) {
        super();
        this.modelConfig = modelConfig;
    }
    ngOnChanges() {
        if (!this.formControl) {
            this.formControl = new forms_1.FormControl(this.value || []);
        }
        if (this.field) {
            this.model = this.model || this.field['model'];
        }
        if (this.config) {
            super.useConfig(this.config);
            return;
        }
        this.modelConfig.generateConfig(this.model)
            .then((config) => {
            this.config = Object.assign(config, { size: 10 }, this.crudConfig, { solo: this.solo });
            this.useConfig(this.config);
        });
    }
    select(item) {
        this.selection.toggle(item);
        if (this.config.solo) {
            this.pop.toggle(false);
            this.active = false;
        }
    }
    toggle(active = !this.active, emit = false) {
        super.toggle(active, emit);
        this.pop.toggle();
    }
    canToggle() {
        return true;
    }
    /** Is called when a selected item has been clicked. */
    editItem(item) {
        // if (!item.getBody().save) { //TODO find out if LiteEntryResource or not
        item.getBody().resolve().then((entry) => {
            console.log('resolved', entry);
        });
        // } else {
        //   console.log('edit', item.getBody());
        // }
        //TODO open edit pop
    }
    /** Returns pop class for entry picker, defaults to no class. */
    getPopClass() {
        return this.config && this.config.nestedPopClass ? this.config.nestedPopClass : '';
    }
}
EntrySelectComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-entry-select',
                templateUrl: './entry-select.component.html',
                styleUrls: ['../../../ui/src/form/select/select.component.scss'],
                encapsulation: core_1.ViewEncapsulation.None,
                providers: [
                    {
                        provide: forms_1.NG_VALUE_ACCESSOR,
                        useExisting: core_1.forwardRef(() => EntrySelectComponent),
                        multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
EntrySelectComponent.ctorParameters = () => [
    { type: model_config_service_1.ModelConfigService, },
];
EntrySelectComponent.propDecorators = {
    'field': [{ type: core_1.Input },],
    'formControl': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
    'model': [{ type: core_1.Input },],
    'crud': [{ type: core_1.ViewChild, args: ['crud',] },],
    'solo': [{ type: core_1.Input },],
    'crudConfig': [{ type: core_1.Input, args: ['config',] },],
    'pop': [{ type: core_1.ViewChild, args: ['crudPop',] },],
};
exports.EntrySelectComponent = EntrySelectComponent;
//# sourceMappingURL=entry-select.component.js.map