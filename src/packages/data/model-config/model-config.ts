import { Injectable } from "@angular/core";
import { Item } from '../../core/item/item';
import { EntryResource } from "ec.sdk/typings/resources/publicAPI/EntryResource";
import { ItemConfig } from '../../core/item/item-config.interface';
import { CrudService } from '../crud/crud.service';
import { Config } from '../../core/config/config';
import { FieldConfig } from '../../core/config/field-config.interface';
import { FieldConfigProperty } from '../../core/config/field-config-property.interface';
import { SdkService } from '../sdk/sdk.service';
import { TypeConfig } from './type-config';

/** The main class for configuring the behaviour of a model.
 * By default, everything is auto generated from the model's schema but can be overriden via the
 * set method. */
@Injectable()
export class ModelConfig extends Config {
  /** Injects CrudService and SdkService. */
  constructor(private crud: CrudService, private sdk: SdkService) {
    super();
  }

  /** Array of property names that are omitted by default. */
  omittedFields: Array<string> = [
    'id',
    'private',
    'created',
    'creator',
    'modified'
  ];

  /** Retrieves the given model config.
   * @example
   * ```typescript
   * ModelConfig.get('muffin'); //returns muffin config;
   * ```
   * */
  get(property: string): ItemConfig<EntryResource> {
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
  set(property: string, config: ItemConfig<EntryResource>): ItemConfig<EntryResource> {
    return this.configure('model', property, config);
  }

  /** Checks if a given property name is a system property (either part of omittedFields or beginning with _).*/
  isSystemProperty(property: string) {
    return property[0] === '_' || this.omittedFields.indexOf(property) !== -1;
  }

  /** Parses the property type (as contained in the property schema's title field). */
  parseType(type: string) {
    const match = type.match(/^(\w*)[<\w*>]?/i);
    return !match.length ? null : {
      raw: type,
      name: match[1],
      model: match.length > 2 ? match[2] : null
    };
  }

  /** Generates a proper fieldConfig for a given model and an optional local fieldConfig.
   * Operates in three layers: If a local fieldConfig is given, it will be used.
   * If no local fieldConfig is given, the global model's field config is used.
   * If no global field config is found for that model, it will be generated from the model schema.
   * */
  generateFieldConfig(model: string): Promise<FieldConfig<FieldConfigProperty>> {
    let fieldConfig;
    return Promise.resolve().then(() => {
      //use global config, if given
      if (this.get(model) && this.get(model).fields) {
        return Promise.resolve(this.get(model).fields);
      }
      return;
    }).then((config) => {
      fieldConfig = config;
      return this.sdk.api.getSchema(model);
    }).then((schema) => {
      schema = schema.allOf[1].properties;
      const properties = Object.keys(schema)
      .filter(property => (!fieldConfig && !this.isSystemProperty(property)) || (fieldConfig && !!fieldConfig[property]));
      fieldConfig = fieldConfig || {};
      properties.forEach(property => {
        const type = this.parseType(schema[property].title);
        if (!type) {
          console.error('Model Property Schema title ', schema[property].title, ' was unexpected, ignoring property', property)
          return;
        }
        fieldConfig[property] = Object.assign({
            label: property,
            schema: schema[property],
            model: type.model,
            readOnly: schema[property].readOnly,
            display: ((value) => value)
          }, fieldConfig[property] ? fieldConfig[property] : {},
          TypeConfig.get(type.name));
      });
      return fieldConfig;
    });
  }

  /** Returns the given model's config and generates a field config from the schema if it is not configured. */
  generateConfig(model: string): Promise<ItemConfig<EntryResource>> {
    const config = this.get(model) || {};
    Object.assign(config, {
      identifier: 'id',
      onSave: (item: Item<EntryResource>, value) => this.crud.save(model, item.getBody(), value)
    });
    return this.generateFieldConfig(model).then((fieldConfig) => {
      Object.assign(config, { fields: fieldConfig });
      return Promise.resolve(config);
    });
  }
}
