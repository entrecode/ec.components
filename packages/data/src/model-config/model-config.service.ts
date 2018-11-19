import { Injectable } from '@angular/core';
import { Config } from '@ec.components/core/src/config/config';
import { FieldConfigProperty } from '@ec.components/core/src/config/field-config-property.interface';
import { FieldConfig } from '@ec.components/core/src/config/field-config.interface';
import { Item } from '@ec.components/core/src/item/item';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { CrudConfig } from '../crud/crud-config.interface';
import { CrudService } from '../crud/crud.service';
import { SdkService } from '../sdk/sdk.service';
import { TypeConfigService } from './type-config.service';
import { SdkField } from './sdk-field';

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

  /** Returns the field config for all system fields */
  getSystemFields() {
    return {
      id: {
        label: this.symbol.resolve('field.label.id'),
        view: 'string',
        form: false,
        immutable: true,
        hideInList: true
      },
      _created: {
        label: this.symbol.resolve('field.label.created'),
        display: this.typeConfig.displayDate(),
        group: this.typeConfig.groupDate(),
        form: false,
        immutable: true,
        sortable: true,
        hideInList: true,
        rawFilter: true
      },
      _modified: {
        label: this.symbol.resolve('field.label.modified'),
        display: this.typeConfig.displayDate(),
        group: this.typeConfig.groupDate(),
        form: false,
        immutable: true,
        sortable: true,
        hideInList: false,
        rawFilter: true
      },
      _creator: {
        label: this.symbol.resolve('field.label.creator'),
        display: this.typeConfig.displayAccount(),
        view: 'account',
        form: false,
        immutable: true,
        hideInList: true
      }
    };
  }

  /** Returns the default field config for the given model.
   * Utilizes PublicAPI#getFieldConfig + TypeConfigService#get.
   * This config is meant to deliver the default behaviour when nothing else is configured. */
  getFieldConfig(model: string): Promise<FieldConfig<FieldConfigProperty>> {
    return this.sdk.api.getFieldConfig(model).then((fieldConfig: SdkField) => {
      const fields = {};
      Object.assign(fields, this.getSystemFields());
      Object.keys(fieldConfig).map(property => fieldConfig[property])
        .forEach(({
          config,
          type,
          formView,
          title,
          unique,
          mutable,
          readOnly,
          required,
          validation,
          description,
          localizable,
          legacyAssets,
        }) => {
          config = config || {};
          if (type.includes('asset') && !legacyAssets) {
            type = type.replace('a', 'dmA');
          }
          // parse field config
          const { hideInList,
            hideInForm,
            hideOnCreate,
            hideOnEdit,
            placeholder,
            label,
            classes,
            columns = 12
          } = config;
          // assign default values + merge customFieldConfig if given
          fields[title] = Object.assign({
            property: title,
            label: label || title + (type === 'datetime' ? ` ${this.symbol.resolve('datetime.local')}` : ''),
            placeholder,
            description,
            formView: formView || type,
            validation,
            relation: validation,
            immutable: !mutable,
            readOnly,
            hideInList,
            hideInForm,
            create: !hideOnCreate,
            edit: !hideOnEdit,
            classes,
            unique,
            required,
            columns,
            /* display: ((value) => value), */
            localizable,
          }, this.typeConfig.get(type), {
              placeholder: placeholder || this.typeConfig.get(type).placeholder
            });
        });
      return fields;
    });
  }

  /** Generates a CrudConfig for the given model.
   * Merges three configurations into one:
   * - default field config, obtained by getFieldConfig
   * - global model config (if any) configured via with set
   * - customFieldConfig: any custom field config that is merged on top of the other two.
   * This enables the developer to either customize at a global scale to target all lists/forms,
   * or just specific components. */
  generateConfig(model: string, customFieldConfig?: FieldConfig<FieldConfigProperty>): Promise<CrudConfig<EntryResource>> {
    // first step: merge global model config with default entry config
    const modelConfig = Object.assign(this.get(model) || {}, {
      identifier: 'id',
      identifierPattern: /^[0-9A-Za-z-_]{7,14}$/, // shortID pattern
      label: '_entryTitle',
      onSave: (item: Item<EntryResource>, value) => this.crud.save(model, item.getBody(), value)
    });
    return this.getFieldConfig(model)
      .then((fieldConfig: FieldConfig<FieldConfigProperty>) => {
        const modelConfigFields = modelConfig.fields || {};
        const relevantKeys = Object.keys(customFieldConfig || modelConfigFields);
        const mergedFields = {};
        if (!relevantKeys.length) {
          modelConfig.fields = fieldConfig;
        } else {
          relevantKeys.forEach(key => {
            mergedFields[key] = Object.assign(
              {},
              fieldConfig[key] || {},
              modelConfigFields[key] || {},
              (customFieldConfig || {})[key]);
          });
          modelConfig.fields = mergedFields;
        }
        return modelConfig;
      });
  }
  /** Returns light model information */
  getLightModel(model) {
    return this.sdk.ready.then(() => this.sdk.api.modelList()).then((models) => models[model]);
  }
}
