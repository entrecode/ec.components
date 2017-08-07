import { Config, FieldConfig, FieldConfigProperty } from '../../core';
import { Datamanager, ModelConfiguration } from '..';
import * as moment from 'moment';
import { DefaultEntryInputComponent } from '../entry-form/default-entry-input.component';
import { DefaultInputComponent } from '../../ui/input/default-input.component';
import { Type } from "@angular/core";

/** The main class for configuring model data behaviour.*/
export class ModelConfig extends Config {
  /** Array of property names that are omitted by default. */
  static omittedFields: Array<string> = [
    'id',
    'private',
    'created',
    'creator',
    'modified'
  ];

  /** Maps field types to view types (may be deprecated in the future) */
  static typeViews = {
    entries: 'labels',
    entry: 'label',
    asset: 'avatar',
    assets: 'avatars',
    text: 'string',
    decimal: 'number',
    number: 'number',
    boolean: 'boolean',
    datetime: 'date'
  };

  /** Maps field types to components */
  static typeInputComponents = {};

  /** Registers a custom input component for the given types. You can e.g. register a custom file picker for the types 'asset' and 'assets'.
   * Be aware that you have to handle different formats yourself when dealing with multiple types*/
  static registerInputComponent(component: Type<any>, types: Array<string>) {
    types.forEach((type) => {
      this.typeInputComponents[type] = component;
    })
  }

  /** Retrieves the component that should be used to render an input for the given type.
   * You can register components via registerInputComponent for custom components.
   * */
  static getInputComponent(type) {
    if (this.typeInputComponents[type]) {
      return this.typeInputComponents[type];
    }
    if (type === 'text' || type === 'decimal' || type === 'boolean' || type === 'number' || type === 'datetime') {
      return DefaultInputComponent;
    }
    return DefaultEntryInputComponent;
  }

  /** Retrieves the given model config.
   * @example
   * ```typescript
   * ModelConfig.get('muffin'); //returns muffin config;
   * ```
   * */
  static get(property: string): ModelConfiguration {
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
  static set(property: string, config: ModelConfiguration): ModelConfiguration {
    return this.configure('model', property, config);
  }

  /** Returns a resolve function that will return the value of a certain field type and property. */
  static displayField(type, property) {
    if (['entries', 'entry'].indexOf(type) !== -1) {
      return (value, entry) => entry.getTitle(property);
    }
    if (['asset', 'assets'].indexOf(type) !== -1) {
      return (value, entry) => entry.getImageThumbUrl('pictures', 100);
    }
    if (type === 'datetime') {
      return (value) => moment(value).format('DD.MM.YY');
    }
    return (value) => value;
  };

  /** Checks if a given property name is a system property (either part of omittedFields or beginning with _).*/
  static isSystemProperty(property: string) {
    return property[0] === '_' || this.omittedFields.indexOf(property) !== -1;
  }

  /** Parses the property type (as contained in the property schema's title field). */
  static parseType(type: string) {
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
  static generateFieldConfig(model: string): Promise<FieldConfig<FieldConfigProperty>> {
    let fieldConfig;
    return Promise.resolve().then(() => {
      //use global config, if given
      if (this.get(model) && this.get(model).fields) {
        return Promise.resolve(this.get(model).fields);
      }
      return;
    }).then((config) => {
      fieldConfig = config;
      return Datamanager.schema(model);
    }).then((schema) => {
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
          type: type.name,
          view: this.typeViews[type.name],
          model: type.model,
          display: this.displayField(type.name, property),
          input: this.getInputComponent(type.name)
          // TODO set custom input/ouput components based on view
        }, fieldConfig[property] ? fieldConfig[property] : {});
        //TODO find strategy for input/output templates!!
      });
      return fieldConfig;
    });
  }
}