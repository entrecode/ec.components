import { Config, FieldConfig, FieldConfigProperty } from '../../core';
import { Datamanager } from '..';
import * as moment from 'moment';
import { DefaultEntryInputComponent } from '../entry-form/default-entry-input.component';
import { DefaultInputComponent } from '../../ui/input/default-input.component';
import { Injectable, Type } from "@angular/core";
import { Item } from '../../core/item/item';
import { EntryResource } from "ec.sdk/typings/resources/publicAPI/EntryResource";
import { ItemConfig } from '../../core/item/item-config.interface';
import { DefaultOutputComponent } from '../../ui/output/default-output.component';

/** The main class for configuring model data behaviour.*/
@Injectable()
export class ModelConfig extends Config {
  /** Array of property names that are omitted by default. */
  omittedFields: Array<string> = [
    'id',
    'private',
    'created',
    'creator',
    'modified'
  ];

  /** Maps field types to view types (may be deprecated in the future) */
  typeViews = {
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

  /** which types should be sortable by default? */
  sortableTypes = ['text', 'number', 'datetime'];
  /** which types should be filterable by default? */
  filterableTypes = ['text', 'formattedText'];

  //TODO simplify input output logic / use service etc.
  /** Maps field types to input omponents */
  typeInputComponents = {};
  /** Maps field types to output components */
  typeOutputComponents = {};

  /** Registers a custom input component for the given types. You can e.g. register a custom file picker for the types 'asset' and 'assets'.
   * Be aware that you have to handle different formats yourself when dealing with multiple types*/
  registerInputComponent(component: Type<any>, types: Array<string>) {
    types.forEach((type) => {
      this.typeInputComponents[type] = component;
    })
  }

  /** Registers a custom output component for the given types. You can e.g. register a custom file viewer for the types 'asset' and 'assets'.
   * Be aware that you have to handle different formats yourself when dealing with multiple types*/
  registerOutputComponent(component: Type<any>, types: Array<string>) {
    types.forEach((type) => {
      this.typeOutputComponents[type] = component;
    })
  }

  /** Retrieves the component that should be used to render an input for the given type.
   * You can register components via registerInputComponent for custom components.
   * */
  getInputComponent(type) {
    if (this.typeInputComponents[type]) {
      return this.typeInputComponents[type];
    }
    if (type === 'text' || type === 'decimal' || type === 'boolean' || type === 'number') {
      return DefaultInputComponent;
    }
    return DefaultEntryInputComponent;
  }

  /** Retrieves the component that should be used to render an output for the given type.
   * You can register components via registerInputComponent for custom components.
   * */
  getOutputComponent(type) {
    if (this.typeOutputComponents[type]) {
      return this.typeOutputComponents[type];
    }
    return DefaultOutputComponent;
    //TODO DefaultEntryOutputComponent?
  }

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
  set(property: string, config: ItemConfig<EntryResource>): ItemConfig<any> {
    return this.configure('model', property, config);
  }

  /** Returns a resolve function that will return the value of a certain field type and property. */
  displayField(type, property) {
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
          input: this.getInputComponent(type.name),
          output: this.getOutputComponent(type.name),
          filterable: this.filterableTypes.indexOf(type.name) !== -1,
          sortable: this.sortableTypes.indexOf(type.name) !== -1,
        }, fieldConfig[property] ? fieldConfig[property] : {});
      });
      return fieldConfig;
    });
  }

  /** Returns the given model's config and generates a field config from the schema if it is not configured. */
  generateConfig(model: string): Promise<ItemConfig<EntryResource>> {
    const config = this.get(model);
    Object.assign(config, {
      identifier: 'id',
      onSave: (item: Item<EntryResource>, value) => {
        console.log('save entry value', value);
        const entry = item.getBody();
        const oldValues = {};
        //save old values to fall back on error
        Object.keys(value).forEach((key) => oldValues[key] = entry[key]);
        Object.assign(entry, value); //assign new form values
        if (entry && entry.save) { //PUT
          return entry.save().then((savedEntry) => {
            console.log('saved', savedEntry);
            return item;
          }).catch((err) => {
            console.error('could no save...', err);
            Object.assign(entry, oldValues); //fall back to old values
            //TODO connect to error handler
          });
        } else { //POST
          console.log('create entry tbd..');
          return Promise.resolve();
          //TODO
        }
      }
    });

    return this.generateFieldConfig(model).then((fieldConfig) => {
      Object.assign(config, { fields: fieldConfig });
      return Promise.resolve(config);
    });
  }
}