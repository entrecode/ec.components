"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const crud_service_1 = require("../crud/crud.service");
const config_1 = require("@ec.components/core/src/config/config");
const sdk_service_1 = require("../sdk/sdk.service");
const type_config_service_1 = require("./type-config.service");
/** The main class for configuring the behaviour of a model.
 * By default, everything is auto generated from the model's schema but can be overriden via the
 * set method. */
class ModelConfigService extends config_1.Config {
    /** Injects CrudService and SdkService. */
    constructor(crud, sdk, typeConfig) {
        super();
        this.crud = crud;
        this.sdk = sdk;
        this.typeConfig = typeConfig;
        /** Array of property names that are omitted by default. */
        this.omittedFields = [
            'id',
            'private',
            'created',
            'creator',
            'modified'
        ];
    }
    /** Retrieves the given model config.
     * @example
     * ```typescript
     * ModelConfig.get('muffin'); //returns muffin config;
     * ```
     * */
    get(property) {
        return this.configure('model', property);
    }
    /** Sets the given model config.
     * @example
     * ```typescript
     * ModelConfig.set('muffin', {
     *  fields: {
     *    title: {
     *      label: 'Muffin Titel'
     *    }
     *  });
     * ```
     * */
    set(property, config) {
        return this.configure('model', property, config);
    }
    /** Checks if a given property name is a system property (either part of omittedFields or beginning with _).*/
    isSystemProperty(property) {
        return property[0] === '_' || this.omittedFields.indexOf(property) !== -1;
    }
    /** Parses the property type (as contained in the property schema's title field). */
    parseType(type) {
        const match = type.match(/^(\w*)(<(\w*)>)?/i);
        return !match.length ? null : {
            raw: type,
            name: match[1],
            model: match.length > 2 ? match[3] : null
        };
    }
    /** Generates a proper fieldConfig for a given model and an optional local fieldConfig.
     * Operates in three layers: If a local fieldConfig is given, it will be used.
     * If no local fieldConfig is given, the global model's field config is used.
     * If no global field config is found for that model, it will be generated from the model schema.
     * */
    generateFieldConfig(model) {
        let fieldConfig;
        return Promise.resolve().then(() => {
            //use global config, if given
            if (this.get(model) && this.get(model).fields) {
                return Promise.resolve(this.get(model).fields);
            }
            return;
        }).then((config) => {
            fieldConfig = config;
            return this.sdk.getSchema(model);
        }).then((schema) => {
            schema = schema.allOf[1];
            const properties = Object.keys(schema.properties)
                .filter(property => (!fieldConfig && !this.isSystemProperty(property)) || (fieldConfig && !!fieldConfig[property]));
            fieldConfig = fieldConfig || {};
            properties.forEach(property => {
                const type = this.parseType(schema.properties[property].title);
                if (!type) {
                    console.error('Model Property Schema title ', schema.properties[property].title, ' was unexpected, ignoring property', property);
                    return;
                }
                fieldConfig[property] = Object.assign({
                    label: property,
                    schema: schema.properties[property],
                    model: type.model,
                    readOnly: schema.properties[property].readOnly,
                    // required: schema.required.indexOf(property) !== -1,
                    display: ((value) => value)
                }, this.typeConfig.get(type.name), fieldConfig[property] ? fieldConfig[property] : {});
            });
            return fieldConfig;
        });
    }
    /** Returns the given model's config and generates a field config from the schema if it is not configured. */
    generateConfig(model) {
        const config = Object.assign({}, this.get(model) || {}); //clone
        Object.assign(config, {
            identifier: 'id',
            label: '_entryTitle',
            //TODO add label _entryTitle (or similar) when generic entryTitle property is there
            onSave: (item, value) => this.crud.save(model, item.getBody(), value)
        });
        return this.generateFieldConfig(model).then((fieldConfig) => {
            Object.assign(config, { fields: fieldConfig });
            return Promise.resolve(config);
        });
    }
}
ModelConfigService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
ModelConfigService.ctorParameters = () => [
    { type: crud_service_1.CrudService, },
    { type: sdk_service_1.SdkService, },
    { type: type_config_service_1.TypeConfigService, },
];
exports.ModelConfigService = ModelConfigService;
//# sourceMappingURL=model-config.service.js.map