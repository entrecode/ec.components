import { DefaultEntryInputComponent } from '../entry-form/default-entry-input.component';
import { DefaultEntryOutputComponent } from '../entry-form/default-entry-output.component';
import { DefaultOutputComponent } from '../../ui/output/default-output.component';
import { DefaultInputComponent } from '../../ui/input/default-input.component';
import * as moment from 'moment';
import { FieldConfig } from '../../core/config/field-config.interface';
import { FieldConfigProperty } from '../../core/config/field-config-property.interface';
import { Injectable } from "@angular/core";

/** The TypeConfig holds each field type's specific behaviour in certain situations */
@Injectable()
export class TypeConfigService {
  /** Defines the base configuration of each type.*/
  private types: FieldConfig<FieldConfigProperty> = {
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
      input: DefaultEntryInputComponent,
      display: (value, entry, property) => entry.getImageThumbUrl(property, 100)
    },
    assets: {
      view: 'avatars',
      input: DefaultEntryInputComponent,
      display: (value, entry, property) => entry.getImageThumbUrl(property, 100)
    },
    email: {},
    phone: {
      view: 'string'
    },
    datetime: {
      view: 'date',
      sortable: true,
      // display: (value) => moment(value).format('DD.MM.YY')
      display: (value) => moment(value).format('DD.MM.YY')
    },
    entry: {
      view: 'label',
      input: DefaultEntryInputComponent,
      output: DefaultOutputComponent,
      display: (value, entry, property) => entry.getTitle(property),
      filterable: true,
      filterOperator: 'any'
    },
    entries: {
      view: 'labels',
      input: DefaultEntryInputComponent,
      output: DefaultOutputComponent,
      display: (value, entry, property) => entry.getTitle(property),
      filterable: true,
      filterOperator: 'any',
      // form: false,
    },
    json: {
      input: DefaultEntryInputComponent,
      output: DefaultEntryOutputComponent,
      display: (value) => value ? JSON.stringify(value) : ''
    },
    location: {
      input: DefaultEntryInputComponent,
      output: DefaultEntryOutputComponent,
      display: (value) => value ? value.longitude + ',' + value.latitude : ''
    },
    account: {
      input: DefaultEntryInputComponent,
      output: DefaultEntryOutputComponent,
    },
    role: {
      input: DefaultEntryInputComponent,
      output: DefaultEntryOutputComponent,
    }
  };

  /** Returns the base FieldConfig for the given type. */
  get(type: string): FieldConfigProperty {
    const config = this.types[type];
    if (!config) {
      console.error('missing config for type', type);
      return {};
    }
    Object.assign(config, {
      type,
      view: config.view || type,
      input: config.input || DefaultInputComponent,
      output: config.output || DefaultOutputComponent,
    });
    return config;
  }

  /** Assigns the given config to the type, e.g. to change the default template of a type. */
  set(type: string, config: FieldConfigProperty) {
    if (!this.types[type]) {
      console.error('cannot configure non existing type', type);
      return;
    }
    Object.assign(this.types[type], config);
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
      return { id: value, name: 'Simi' };
    }
    if (value && value.getTitle) {
      // return { id: value.id, _entryTitle: value.getTitle('') }
      return { id: value.id, [value.getModelTitleField()]: value.getTitle('') }
      //TODO use modelTitleField when it is possible to get it with lvl1
    }
  }*/
}