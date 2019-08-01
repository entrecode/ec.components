import { Injectable } from '@angular/core';
import { Config, FieldConfig, Item } from '@ec.components/core';
import { SymbolService, DefaultInputComponent } from '@ec.components/ui';
import { fields } from 'ec.sdk/lib/PublicAPI';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { CrudConfig } from '../crud/crud-config.interface';
import { EntryService } from '../entry/entry.service';
import { SdkService } from '../sdk/sdk.service';
import { TypeConfigService } from './type-config.service';
import { AdminEntryInputComponent } from '../entry-form/admin-entry-input.component';
import { DefaultEntryOutputComponent } from '../entry-form/default-entry-output.component';

/** The main class for configuring the behaviour of a model.
 * By default, everything is auto generated from the model's schema but can be overriden via the
 * set method. */
@Injectable()
export class ModelConfigService extends Config {
  /** Array of property names that are omitted by default. */
  omittedFields: Array<string> = ['id', 'private', 'created', 'creator', 'modified'];

  /** Injects EntryService and SdkService. */
  constructor(
    private entryService: EntryService,
    private sdk: SdkService,
    private typeConfig: TypeConfigService,
    private symbol: SymbolService,
  ) {
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
        create: false,
        view: 'copy',
        filterView: 'string',
        filterable: true,
        filterOperator: 'exact',
        form: true,
        immutable: true,
        hideInList: true,
        columns: 3,
      },
      _created: {
        label: this.symbol.resolve('field.label.created'),
        display: this.typeConfig.displayDate(),
        group: this.typeConfig.groupDate(),
        copy: this.typeConfig.isoDate(),
        create: false,
        form: true,
        columns: 3,
        view: 'copy',
        immutable: true,
        sortable: true,
        hideInList: true,
        rawFilter: true,
      },
      _modified: {
        label: this.symbol.resolve('field.label.modified'),
        display: this.typeConfig.displayDate(),
        group: this.typeConfig.groupDate(),
        copy: this.typeConfig.isoDate(),
        create: false,
        form: true,
        columns: 3,
        view: 'copy',
        immutable: true,
        sortable: true,
        hideInList: false,
        rawFilter: true,
      },
      _creator: {
        label: this.symbol.resolve('field.label.creator'),
        display: this.typeConfig.displayAccount(),
        copy: (value) => this.typeConfig.displayAccount(),
        create: false,
        type: 'account',
        view: 'copy',
        columns: 3,
        form: true,
        immutable: true,
        hideInList: true,
        filterable: true,
        filterComponent: AdminEntryInputComponent,
        formComponent: DefaultInputComponent,
        output: DefaultEntryOutputComponent,
        readOnly: true,
        filterPopClass: 'ec-pop_dialog',
        filterOperator: 'exact',
      },
    };
  }

  /** Parses config for fields that require leveled entries */
  getMinLevel(model: string, customFieldConfig?: FieldConfig) {
    return this.generateConfig(model, customFieldConfig).then((modelConfig) => {
      const fieldConfig = modelConfig.fields;
      return Object.keys(fieldConfig)
        .filter((field) => !!fieldConfig[field].type)
        .map((field) => {
          const inputView = fieldConfig[field].inputView;
          const views = this.typeConfig.get(fieldConfig[field].type).inputViews || [];
          if (!inputView || !views) {
            return 1;
          }
          const match = views.find((v) => v.name === inputView);
          return match ? match.levels || 1 : 1;
        })
        .reduce((max, lvl) => Math.max(max, lvl), 1);
    });
  }

  /** Returns the default field config for the given model.
   * Utilizes PublicAPI#getFieldConfig + TypeConfigService#get.
   * This config is meant to deliver the default behaviour when nothing else is configured. */
  getFieldConfig(model: string): Promise<FieldConfig> {
    return this.sdk.api.getFieldConfig(model).then((fieldConfig: fields) => {
      const merged = {};
      Object.assign(merged, this.getSystemFields());
      Object.keys(fieldConfig)
        .map((property) => fieldConfig[property])
        .forEach(
          ({ config, type, title, unique, mutable, readOnly, required, validation, description, localizable }) => {
            /* type = type as string; */
            config = config || {};
            if (type.includes('asset')) {
              type = type.replace('a', 'dmA');
            }
            // parse field config
            const {
              hideInList,
              hideInForm,
              hideOnCreate,
              hideOnEdit,
              placeholder,
              inputView,
              label,
              classes,
              columns = 12,
            } = config;
            const typeConfig = this.typeConfig.get(type);
            // assign default values + merge customFieldConfig if given
            merged[title] = Object.assign(
              {
                property: title,
                label: label || title + (type === 'datetime' ? ` ${this.symbol.resolve('datetime.local')}` : ''),
                placeholder,
                description,
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
              },
              typeConfig,
              {
                placeholder: placeholder || typeConfig.placeholder,
                inputView: inputView || typeConfig.inputView,
              },
            );
          },
        );
      return merged;
    });
  }

  /** Generates a CrudConfig for the given model.
   * Merges three configurations into one:
   * - default field config, obtained by getFieldConfig
   * - global model config (if any) configured via with set
   * - customFieldConfig: any custom field config that is merged on top of the other two.
   * This enables the developer to either customize at a global scale to target all lists/forms,
   * or just specific components. */
  async generateConfig(model: string, customFieldConfig?: FieldConfig): Promise<CrudConfig<EntryResource>> {
    const lightModel = await this.getLightModel(model);
    // first step: merge global model config with default entry config
    const modelConfig = Object.assign(this.get(model) || {}, {
      identifier: 'id',
      identifierPattern: /^[0-9A-Za-z-_]{7,14}$/, // shortID pattern
      label: '_entryTitle',
      defaultFilter: lightModel.titleField,
      onSave: (item: Item<EntryResource>, value) => this.entryService.save(model, item, value),
    });
    return this.getFieldConfig(model).then((fieldConfig: FieldConfig) => {
      const modelConfigFields = modelConfig.fields || {};
      const relevantKeys = Object.keys(customFieldConfig || modelConfigFields);
      const mergedFields = {};
      if (!relevantKeys.length) {
        modelConfig.fields = fieldConfig;
      } else {
        relevantKeys.forEach((key) => {
          mergedFields[key] = Object.assign(
            {},
            fieldConfig[key] || {},
            modelConfigFields[key] || {},
            (customFieldConfig || {})[key],
          );
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
