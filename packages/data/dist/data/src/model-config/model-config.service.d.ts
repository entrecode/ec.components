import EntryResource from "ec.sdk/src/resources/publicAPI/EntryResource";
import { ItemConfig } from '@ec.components/core/src/item/item-config.interface';
import { CrudService } from '../crud/crud.service';
import { Config } from '@ec.components/core/src/config/config';
import { FieldConfig } from '@ec.components/core/src/config/field-config.interface';
import { FieldConfigProperty } from '@ec.components/core/src/config/field-config-property.interface';
import { SdkService } from '../sdk/sdk.service';
import { TypeConfigService } from './type-config.service';
import { ListConfig } from '@ec.components/core/src/list/list-config.interface';
/** The main class for configuring the behaviour of a model.
 * By default, everything is auto generated from the model's schema but can be overriden via the
 * set method. */
export declare class ModelConfigService extends Config {
    private crud;
    private sdk;
    private typeConfig;
    /** Injects CrudService and SdkService. */
    constructor(crud: CrudService, sdk: SdkService, typeConfig: TypeConfigService);
    /** Array of property names that are omitted by default. */
    omittedFields: Array<string>;
    /** Retrieves the given model config.
     * @example
     * ```typescript
     * ModelConfig.get('muffin'); //returns muffin config;
     * ```
     * */
    get(property: string): ItemConfig<EntryResource>;
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
    set(property: string, config: ItemConfig<EntryResource>): ItemConfig<EntryResource>;
    /** Checks if a given property name is a system property (either part of omittedFields or beginning with _).*/
    isSystemProperty(property: string): boolean;
    /** Parses the property type (as contained in the property schema's title field). */
    parseType(type: string): {
        raw: string;
        name: string;
        model: string;
    };
    /** Generates a proper fieldConfig for a given model and an optional local fieldConfig.
     * Operates in three layers: If a local fieldConfig is given, it will be used.
     * If no local fieldConfig is given, the global model's field config is used.
     * If no global field config is found for that model, it will be generated from the model schema.
     * */
    generateFieldConfig(model: string): Promise<FieldConfig<FieldConfigProperty>>;
    /** Returns the given model's config and generates a field config from the schema if it is not configured. */
    generateConfig(model: string): Promise<ListConfig<EntryResource>>;
}
