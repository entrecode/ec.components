import { DefaultEntryInputComponent } from '../entry-form/default-entry-input.component';
import { DefaultEntryOutputComponent } from '../entry-form/default-entry-output.component';
import { DefaultOutputComponent } from '@ec.components/ui/src/form/default-output/default-output.component';
import { DefaultInputComponent } from '@ec.components/ui/src/form/default-input/default-input.component';
import * as moment from 'moment';
import { FieldConfig } from '@ec.components/core/src/config/field-config.interface';
import { FieldConfigProperty } from '@ec.components/core/src/config/field-config-property.interface';
import { Injectable } from "@angular/core";
import { AssetInputComponent } from '../files/asset-input/asset-input.component';

/** The TypeConfig holds each field type's specific behaviour in certain situations */
@Injectable()
export class TypeConfigService {
  /** Defines the base configuration of each type.*/
  private types: FieldConfig<FieldConfigProperty> = {
    id: {
      view: 'label'
    },
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
      input: AssetInputComponent,
      filterOperator: 'any',
      filterable: true,
      display: (value, entry, property) => entry.getImageThumbUrl(property, 100),
    },
    assets: {
      view: 'avatars',
      input: AssetInputComponent,
      display: (value, entry, property) => entry.getImageThumbUrl(property, 100),
      prefill: [],
      filterOperator: 'any',
      filterable: true,
      queryFilter: (value) => value.split(',')
    },
    email: {},
    phone: {
      view: 'string'
    },
    datetime: {
      view: 'date',
      sortable: true,
      // display: (value) => moment(value).format('DD.MM.YY')
      display: (value) => value ? moment(value).format('DD.MM.YY') : '',
      validate: (value) => {
        if (value && (value === 'invalid' || !moment(value).isValid())) {
          return 'Ungültiges Datum';
        }
        return;
      }
      /*,
      prefill: new Date(0)*/
    },
    entry: {
      view: 'tag',
      input: DefaultEntryInputComponent,
      output: DefaultOutputComponent,
      display: (value, entry, property) => entry.getTitle(property),
      // resolve: (body) => TypeConfigService.resolveEntries,
      filterable: true,
      filterOperator: 'any'
    },
    entries: {
      view: 'tags',
      input: DefaultEntryInputComponent,
      output: DefaultOutputComponent,
      display: (value, entry, property) => entry.getTitle(property),
      // resolve: (body) => TypeConfigService.resolveEntries,
      filterable: true,
      filterOperator: 'any',
      prefill: [],
      queryFilter: (value) => value.split(',')
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
}