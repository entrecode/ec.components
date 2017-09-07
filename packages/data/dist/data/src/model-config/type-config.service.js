"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_entry_input_component_1 = require("../entry-form/default-entry-input.component");
const default_entry_output_component_1 = require("../entry-form/default-entry-output.component");
const default_output_component_1 = require("@ec.components/ui/src/form/default-output/default-output.component");
const default_input_component_1 = require("@ec.components/ui/src/form/default-input/default-input.component");
const moment = require("moment");
const core_1 = require("@angular/core");
const asset_input_component_1 = require("../files/asset-input/asset-input.component");
/** The TypeConfig holds each field type's specific behaviour in certain situations */
class TypeConfigService {
    constructor() {
        /** Defines the base configuration of each type.*/
        this.types = {
            id: {
                view: 'label'
            },
            text: {
                view: 'string',
                filterable: true,
                sortable: true,
            },
            boolean: {
                filterable: true,
                filterOperator: 'exact',
                prefill: false,
            },
            formattedText: {
                view: 'textarea',
                filterable: true,
                sortable: true,
            },
            number: {
                sortable: true,
                filterable: true,
                filterOperator: 'exact'
            },
            decimal: {
                view: 'number',
                sortable: true,
            },
            url: {
                sortable: true,
                filterable: true,
            },
            asset: {
                view: 'avatar',
                input: asset_input_component_1.AssetInputComponent,
                filterOperator: 'any',
                filterable: true,
                display: (value, entry, property) => entry.getImageThumbUrl(property, 100),
            },
            assets: {
                view: 'avatars',
                input: asset_input_component_1.AssetInputComponent,
                display: (value, entry, property) => entry.getImageThumbUrl(property, 100),
                prefill: [],
                filterOperator: 'any',
                filterable: true,
                queryFilter: (value) => value.split(',')
            },
            email: {},
            phone: {
                view: 'string'
            },
            datetime: {
                view: 'date',
                sortable: true,
                // display: (value) => moment(value).format('DD.MM.YY')
                display: (value) => value ? moment(value).format('DD.MM.YY') : '',
                validate: (value) => {
                    if (value && (value === 'invalid' || !moment(value).isValid())) {
                        return 'Ungültiges Datum';
                    }
                    return;
                }
                /*,
                prefill: new Date(0)*/
            },
            entry: {
                view: 'tag',
                input: default_entry_input_component_1.DefaultEntryInputComponent,
                output: default_output_component_1.DefaultOutputComponent,
                display: (value, entry, property) => entry.getTitle(property),
                // resolve: (body) => TypeConfigService.resolveEntries,
                filterable: true,
                filterOperator: 'any'
            },
            entries: {
                view: 'tags',
                input: default_entry_input_component_1.DefaultEntryInputComponent,
                output: default_output_component_1.DefaultOutputComponent,
                display: (value, entry, property) => entry.getTitle(property),
                // resolve: (body) => TypeConfigService.resolveEntries,
                filterable: true,
                filterOperator: 'any',
                prefill: [],
                queryFilter: (value) => value.split(',')
                // form: false,
            },
            json: {
                input: default_entry_input_component_1.DefaultEntryInputComponent,
                output: default_entry_output_component_1.DefaultEntryOutputComponent,
                display: (value) => value ? JSON.stringify(value) : ''
            },
            location: {
                input: default_entry_input_component_1.DefaultEntryInputComponent,
                output: default_entry_output_component_1.DefaultEntryOutputComponent,
                display: (value) => value ? value.longitude + ',' + value.latitude : ''
            },
            account: {
                input: default_entry_input_component_1.DefaultEntryInputComponent,
                output: default_entry_output_component_1.DefaultEntryOutputComponent,
            },
            role: {
                input: default_entry_input_component_1.DefaultEntryInputComponent,
                output: default_entry_output_component_1.DefaultEntryOutputComponent,
            }
        };
    }
    /** Returns the base FieldConfig for the given type. */
    get(type) {
        const config = this.types[type];
        if (!config) {
            console.error('missing config for type', type);
            return {};
        }
        Object.assign(config, {
            type,
            view: config.view || type,
            input: config.input || default_input_component_1.DefaultInputComponent,
            output: config.output || default_output_component_1.DefaultOutputComponent,
        });
        return config;
    }
    /** Assigns the given config to the type, e.g. to change the default template of a type. */
    set(type, config) {
        if (!this.types[type]) {
            console.error('cannot configure non existing type', type);
            return;
        }
        Object.assign(this.types[type], config);
    }
}
/** Resolves entry/entries from nested resource or id inside (single and array).
 * Gives back standardizes "light" entries {id, _entryTitle} */
/*static resolveEntries(entry, item, property, value = entry[property]) {
  if (Array.isArray(value)) {
    return value ? value.map((e) => TypeConfigService.resolveEntries(entry, item, property, e)) : [];
  }
  if (typeof value === 'string') {
    //TODO use getLevels when ready
    //TODO is it possible to get the model title field of the nested entry? (and useful)
    return { id: value, _entryTitle: entry.getTitle(property) };
  }
  if (value && value.getTitle) {
    // return { id: value.id, _entryTitle: value.getTitle('') }
    return { id: value.id, _entryTitle: value.getTitle() }
    //TODO use modelTitleField when it is possible to get it with lvl1
  }
}*/
TypeConfigService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
TypeConfigService.ctorParameters = () => [];
exports.TypeConfigService = TypeConfigService;
//# sourceMappingURL=type-config.service.js.map