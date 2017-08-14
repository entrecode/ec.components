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
      filterable: true,
      sortable: true
    },
    formattedText: {
      view: 'textarea',
      filterable: true,
      sortable: true,
    },
    number: {
      sortable: true,
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
      input: DefaultEntryInputComponent,
      output: DefaultEntryOutputComponent,
      display: (value, entry) => value //TODO
    },
    entries: {
      input: DefaultEntryInputComponent,
      output: DefaultEntryOutputComponent,
      display: (value, entry) => value //TODO
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
}