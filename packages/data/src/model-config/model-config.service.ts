import { Injectable } from '@angular/core';
import { Item } from '@ec.components/core/src/item/item';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { CrudService } from '../crud/crud.service';
import { Config } from '@ec.components/core/src/config/config';
import { FieldConfig } from '@ec.components/core/src/config/field-config.interface';
import { FieldConfigProperty } from '@ec.components/core/src/config/field-config-property.interface';
import { SdkService } from '../sdk/sdk.service';
import { TypeConfigService } from './type-config.service';
import { ListConfig } from '@ec.components/core/src/list/list-config.interface';
import { CrudConfig } from '../crud/crud-config.interface';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import moment from 'moment-es6';

/** The main class for configuring the behaviour of a model.
 * By default, everything is auto generated from the model's schema but can be overriden via the
 * set method. */
@Injectable()
export class ModelConfigService extends Config {
  /** Array of property names that are omitted by default. */
  omittedFields: Array<string> = [
    'id',
    'private',
    'created',
    'creator',
    'modified'
  ];

  /** Injects CrudService and SdkService. */
  constructor(private crud: CrudService,
    private sdk: SdkService,
    private typeConfig: TypeConfigService,
    private symbol: SymbolService) {
    super();
  }

  /** Retrieves the given model config.
   * @example
   * ```typescript
   * ModelConfig.get('muffin'); //returns muffin config;
   * ```
   * */
  get(property: string): CrudConfig<EntryResource> {
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
  set(property: string, config: CrudConfig<EntryResource>): CrudConfig<EntryResource> {
    return this.configure('model', property, config);
  }

  /** Checks if a given property name is a system property (either part of omittedFields or beginning with _).*/
  isSystemProperty(property: string) {
    return property[0] === '_' || this.omittedFields.indexOf(property) !== -1;
  }

  /** Assigns default system fields to given config. Does not override by default */
  addSystemPropertiesToFieldConfig(config: FieldConfig<FieldConfigProperty>, override = false) {
    const defaultConfig = {
      id: {
        label: this.symbol.resolve('field.label.id'),
        view: 'string',
        form: false,
        immutable: true,
        hidden: true
      },
      _created: {
        label: this.symbol.resolve('field.label.created'),
        display: value => moment(value).format(this.symbol.resolve('moment.format.date')),
        group: value => moment(value).format(this.symbol.resolve('moment.format.month')),
        form: false,
        immutable: true,
        sortable: true,
        hidden: true
      },
      _modified: {
        label: this.symbol.resolve('field.label.modified'),
        display: value => moment(value).format(this.symbol.resolve('moment.format.date')),
        group: value => moment(value).format(this.symbol.resolve('moment.format.month')),
        form: false,
        immutable: true,
        sortable: true,
        hidden: false
      },
      creator: {
        label: this.symbol.resolve('field.label.creator'),
        view: 'account',
        form: false,
        immutable: true,
        hidden: true
      }
    };
    Object.keys(defaultConfig).forEach(property =>
      Object.assign(config, {
        [property]: override ? defaultConfig[property] : config[property] || defaultConfig[property]
      }));
  }

  /** Parses the property type (as contained in the property schema's title field). */
  parseType(type: string) {
    if (!type) {
      return null;
    }
    const match = type.match(/^(\w*)(<(\w*)>)?/i);
    return !match.length ? null : {
      raw: type,
      name: match[1],
      relation: match.length > 2 ? match[3] : null
    };
  }

  /** Generates a proper fieldConfig for a given model and an optional local fieldConfig.
   * Operates in three layers: If a local fieldConfig is given, it will be used.
   * If no local fieldConfig is given, the global model's field config is used.
   * If no global field config is found for that model, it will be generated from the model schema.
   * */
  generateFieldConfig(model: string, fields?): Promise<FieldConfig<FieldConfigProperty>> {
    let fieldConfig;
    return Promise.resolve().then(() => {
      if (fields) {
        return fields;
      }
      // use global config, if given
      if (this.get(model) && this.get(model).fields) {
        return this.get(model).fields;
      }
    }).then((config) => {
      fieldConfig = config;
      return this.sdk.getSchema(model);
    }).then((schema) => {
      schema = schema.allOf[1];
      const properties = Object.keys(schema.properties)
        .filter(property => (!fieldConfig && !this.isSystemProperty(property)) || (fieldConfig && !!fieldConfig[property]));
      fieldConfig = fieldConfig || {};
      this.addSystemPropertiesToFieldConfig(fieldConfig); // prepends system fields
      properties.forEach(property => {
        let type;
        if (property === '_entryTitle') {
          type = {
            raw: 'text',
            name: 'text',
            model: null
          };
        } else {
          type = this.parseType(schema.properties[property].title);
        }
        if (!type) {
          console.error('Model Property Schema title ', schema.properties[property].title, ' was unexpected, ignoring property', property)
          return;
        }
        fieldConfig[property] = Object.assign({
          label: property,
          schema: schema.properties[property],
          relation: type.relation,
          readOnly: schema.properties[property].readOnly || this.isSystemProperty(property),
          // required: schema.required.indexOf(property) !== -1, // TODO
          display: ((value) => value)
        }, this.typeConfig.get(type.name),
          fieldConfig[property] ? fieldConfig[property] : {});
      });
      return fieldConfig;
    });
  }

  /** Returns the given model's config and generates a field config from the schema if it is not configured. */
  generateConfig(model: string, fieldConfig?): Promise<ListConfig<EntryResource>> {
    const config = Object.assign({}, this.get(model) || {}); // clone
    Object.assign(config, {
      identifier: 'id',
      label: '_entryTitle',
      onSave: (item: Item<EntryResource>, value) => this.crud.save(model, item.getBody(), value)
    });
    if (!model) {
      return Promise.resolve(config);
    }
    return this.generateFieldConfig(model, fieldConfig).then((fields) => {
      Object.assign(config, { fields });
      return Promise.resolve(config);
    });
  }
}
