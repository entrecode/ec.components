import { DefaultEntryInputComponent } from '../entry-form/default-entry-input.component';
import { DefaultEntryOutputComponent } from '../entry-form/default-entry-output.component';
import { DefaultOutputComponent } from '../../ui/output/default-output.component';
import { DefaultInputComponent } from '../../ui/input/default-input.component';
import * as moment from 'moment';
import { FieldConfig } from '../../core/config/field-config.interface';
import { FieldConfigProperty } from '../../core/config/field-config-property.interface';

/** The TypeConfig holds each field type's specific behaviour in certain situations */
export class TypeConfig {
  //todo add way to map default filter types
  //todo (exact,search etc) for field types e.g. number does not support search
  /** Defines the base configuration of each type.*/
  private static types: FieldConfig<FieldConfigProperty> = {
    text: {
      view: 'string',
      filterable: true,
      sortable: true,
    },
    boolean: {
      // sortable: true,
      filterable: true,
      filterOperator: 'exact'
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
      display: (value, entry, property) => entry.getImageThumbUrl(property, 100)
    },
    assets: {
      view: 'avatars',
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
      resolve: TypeConfig.resolveEntries,
      display: TypeConfig.displayEntries,
    },
    entries: {
      view: 'labels',
      input: DefaultEntryInputComponent,
      output: DefaultOutputComponent,
      resolve: TypeConfig.resolveEntries,
      display: TypeConfig.displayEntries,
    },
    json: {
      input: DefaultEntryInputComponent,
      output: DefaultEntryOutputComponent,
      display: (value) => JSON.stringify(value)
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
  static get(type): FieldConfigProperty {
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

  /** Resolves entry/entries from nested resource or id inside (single and array).
   * Gives back standardizes "light" entries {id, _entryTitle} */
  static resolveEntries(entry, item, property, value = entry[property]) {
    if (Array.isArray(value)) {
      return value ? value.map((e) => TypeConfig.resolveEntries(entry, item, property, e)) : [];
    }
    if (typeof value === 'string') {
      //TODO use getLevels when ready
      //TODO is it possible to get the model title field of the nested entry? (and useful)
      return { id: value, _entryTitle: 'Simi' };
      //TODO wait for getTitle(property) implementation
    }
    if (value && value.getTitle) {
      return { id: value.id, _entryTitle: value.getTitle('') }
    }
  }

  /** Displays one or multiple "light" entries */
  static displayEntries(value, entry) {
    if (Array.isArray(value)) {
      return value.map((nested) => TypeConfig.displayEntries(nested, entry));
    }
    return value ? value._entryTitle : '';
  }
}