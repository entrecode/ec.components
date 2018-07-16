import { Injectable } from '@angular/core';
import { FieldConfigProperty } from '@ec.components/core/src/config/field-config-property.interface';
import { FieldConfig } from '@ec.components/core/src/config/field-config.interface';
import { DefaultInputComponent } from '@ec.components/ui/src/form/default-input/default-input.component';
import { DefaultOutputComponent } from '@ec.components/ui/src/form/default-output/default-output.component';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import moment from 'moment-es6';
import { CrudConfig } from '../crud/crud-config.interface';
import { AdminEntryInputComponent } from '../entry-form/admin-entry-input.component';
import { DefaultEntryInputComponent } from '../entry-form/default-entry-input.component';
import { DefaultEntryOutputComponent } from '../entry-form/default-entry-output.component';

/** The TypeConfig holds each field type's specific behaviour in certain situations */
@Injectable()
export class TypeConfigService {
  /** The default config for nested crud lists, as passed to entry-select */
  private nestedCrudConfig: CrudConfig<EntryResource> = {
    size: 10,
    // methods: ['get'],
    popClass: 'ec-pop_fullscreen'
  };

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
      prefill: false,
      filterOperator: 'exact'
    },
    formattedText: {
      view: 'textarea',
      filterable: true
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
      view: 'asset',
      input: DefaultEntryInputComponent,
      filterOperator: 'exact',
      filterable: true,
      display: (value, entry, property) => entry.getImageThumbUrl(property, 100),
      filterPopClass: 'ec-pop_dialog'
    },
    assets: {
      view: 'assets',
      input: DefaultEntryInputComponent,
      /* display: (value, entry, property) => entry.getImageThumbUrl(property, 100), */
      prefill: [],
      filterOperator: 'any',
      filterable: true,
      queryFilter: (value) => value.split(','),
      filterPopClass: 'ec-pop_dialog'
    },
    email: {},
    phone: {
      view: 'string'
    },
    datetime: {
      view: 'date',
      sortable: true,
      display: this.displayDate(true),
      validate: (value) => {
        if (value && (value === 'invalid' || !moment(value).isValid())) {
          return 'Ungültiges Datum';
        }
        return;
      },
      filterPopClass: 'ec-pop_dialog',
      placeholder: moment(new Date()).format(this.symbol.resolve('moment.format.date'))
      /*,
      prefill: new Date(0)*/
    },
    entry: {
      view: 'tag',
      input: DefaultEntryInputComponent,
      output: DefaultOutputComponent,
      display: (value, entry, property) => entry.getTitle(property),
      filterable: true,
      filterOperator: 'exact',
      filterPopClass: 'ec-pop_dialog',
      nestedCrudConfig: this.nestedCrudConfig
    },
    entries: {
      view: 'tags',
      input: DefaultEntryInputComponent,
      output: DefaultOutputComponent,
      display: (value, entry, property) => entry.getTitle(property),
      filterable: true,
      filterOperator: 'any',
      prefill: [],
      queryFilter: (value) => value.split(','),
      filterPopClass: 'ec-pop_dialog',
      nestedCrudConfig: this.nestedCrudConfig
    },
    json: {
      view: 'json',
      input: DefaultEntryInputComponent,
      output: DefaultEntryOutputComponent,
      display: (value) => value ? JSON.stringify(value) : ''
    },
    location: {
      input: DefaultEntryInputComponent,
      output: DefaultEntryOutputComponent,
      display: (value) => value ? value.longitude + ',' + value.latitude : '',
      filterPopClass: 'ec-pop_dialog'
    },
    account: {
      display: (value) => value ? value.title : '',
      input: AdminEntryInputComponent,
      output: DefaultEntryOutputComponent,
      filterPopClass: 'ec-pop_dialog'
    },
    role: {
      display: (value) => value ? value.name : '',
      input: AdminEntryInputComponent,
      output: DefaultEntryOutputComponent,
      filterPopClass: 'ec-pop_dialog'
    }
  };
  constructor(private symbol: SymbolService) { }

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

  /** Returns a date display function. If time is true, the time will be displayed too. Usese 'moment.format.date' and 'moment.format.time' symbols. */
  displayDate(time = true) {
    const format = this.symbol.resolve('moment.format.date') + (time ? ' ' + this.symbol.resolve('moment.format.time') : '');
    return (value) => value ? moment(value).format(format) : '';
  }

  /** Returns an account display function */
  displayAccount() {
    return (value, entry, property) => entry.getTitle(property) || this.symbol.resolve('field.creator.ecuser');
  }

  /** Returns a date group function. Uses 'moment.format.month' symbol */
  groupDate() {
    return (value) => moment(value).format(this.symbol.resolve('moment.format.month'));
  }
}
