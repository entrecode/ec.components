import { Injectable } from '@angular/core';
import { FieldConfig, FieldConfigProperty } from '@ec.components/core';
import { DefaultInputComponent, DefaultOutputComponent, SymbolService } from '@ec.components/ui';
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
    /* size: 5, */
    // methods: ['get']
  };

  /** Defines the base configuration of each type.*/
  private types: FieldConfig = {
    id: {
      view: 'label',
    },
    text: {
      filterable: true,
      sortable: true,
      outputView: 'string',
      outputViews: ['string', 'tag', 'color'].map(name => ({ name })),
      inputView: 'string',
      inputViews: ['string', 'color', 'copy', 'textarea'].map(name => ({ name }))
    },
    boolean: {
      hideFormLabel: true,
      prefill: false,
      filterable: true,
      filterOperator: 'exact',
      outputView: 'boolean',
      /* outputViews: ['boolean'].map(name => ({ name })), */
      inputView: 'boolean',
      inputViews: ['boolean', 'toggle'].map(name => ({ name })),
    },
    formattedText: {
      inputView: 'textarea',
      outputView: 'textarea',
      outputViews: ['textarea', 'string'].map(name => ({ name })),
      filterable: true,
    },
    number: {
      sortable: true,
      filterable: true,
      filterOperator: 'exact',
    },
    decimal: {
      inputView: 'number',
      sortable: true,
    },
    url: {
      outputView: 'url',
      outputViews: ['url', 'string'].map(name => ({ name })),
      inputView: 'url',
      sortable: true,
      filterable: true,
    },
    asset: {
      outputView: 'image',
      outputViews: ['image', /* 'preview', */ 'avatar'].map(name => ({ name })),
      inputView: 'asset-select',
      input: DefaultEntryInputComponent,
      filterOperator: 'exact',
      filterable: true,
      display: (value, entry, property) => entry.getImageThumbUrl(property, 100),
    },
    assets: {
      outputView: 'images',
      outputViews: ['images', 'avatars'].map(name => ({ name })),
      inputView: 'assets-select',
      input: DefaultEntryInputComponent,
      display: (value, entry, property) => entry.getImageThumbUrl(property, 100),
      prefill: [],
      filterOperator: 'any',
      filterable: true,
      queryFilter: (value) => value.split(','),
    },
    dmAsset: {
      outputView: 'images',
      outputViews: ['image', 'avatar'].map(name => ({ name })),
      inputView: 'dmAsset-select',
      input: DefaultEntryInputComponent,
      filterOperator: 'exact',
      filterable: true,
      display: (value, entry, property) => entry.getImageThumbUrl(property, 100),
    },
    dmAssets: {
      outputView: 'images',
      outputViews: ['images', 'avatars'].map(name => ({ name })),
      inputView: 'dmAssets-select',
      input: DefaultEntryInputComponent,
      display: (value, entry, property) => entry.getImageThumbUrl(property, 100),
      prefill: [],
      filterOperator: 'any',
      filterable: true,
      queryFilter: (value) => value.split(','),
    },
    email: {
      inputView: 'email',
      outputView: 'email',
      outputViews: ['email', 'string'].map(name => ({ name })),
    },
    phone: {
      inputView: 'string',
    },
    datetime: {
      inputView: 'date',
      sortable: true,
      display: this.displayDate(true),
      validate: (value) => {
        if (value && (value === 'invalid' || !moment(value).isValid())) {
          return 'Ungültiges Datum';
        }
        return;
      },
      placeholder: moment(new Date()).format(this.symbol.resolve('moment.format.date')),
    },
    entry: {
      outputView: 'tag',
      outputViews: ['tag', 'string'].map(name => ({ name })),
      inputView: 'entry-select',
      input: DefaultEntryInputComponent,
      output: DefaultOutputComponent,
      display: (value, entry, property) => entry.getTitle(property),
      filterable: true,
      filterOperator: 'exact',
      nestedCrudConfig: this.nestedCrudConfig,
    },
    entries: {
      outputView: 'tags',
      outputViews: ['tags', 'strings'].map(name => ({ name })),
      inputView: 'entries-select',
      inputViews: [
        {
          name: 'entries-select',
        },
        {
          name: 'entries-actionbar',
        },
        {
          name: 'entry-list-select',
          levels: 2,
        },
      ],
      input: DefaultEntryInputComponent,
      output: DefaultOutputComponent,
      display: (value, entry, property) => entry.getTitle(property),
      filterable: true,
      filterOperator: 'any',
      prefill: [],
      queryFilter: (value) => value.split(','),
      nestedCrudConfig: this.nestedCrudConfig,
    },
    json: {
      inputView: 'none',
      outputView: 'json',
      display: (value) => (value ? JSON.stringify(value) : ''),
    },
    location: {
      inputView: 'none',
      display: (value) => (value ? value.longitude + ',' + value.latitude : ''),
    },
    account: {
      display: (value) => (value ? value.title : ''),
      input: AdminEntryInputComponent,
      output: DefaultEntryOutputComponent,
      filterable: true,
      filterOperator: 'exact',
    },
    role: {
      display: (value) => (value ? value.name : ''),
      input: AdminEntryInputComponent,
      output: DefaultEntryOutputComponent,
    },
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

  /** Returns a date display function. If time is true, the time will be displayed too.
   * Usese 'moment.format.date' and 'moment.format.time' symbols. */
  displayDate(time = true) {
    const format =
      this.symbol.resolve('moment.format.date') + (time ? ' ' + this.symbol.resolve('moment.format.time') : '');
    return (value) => (value ? moment(value).format(format) : '');
  }

  /** Returns an account display function */
  displayAccount() {
    return (value, entry, property) => entry.getTitle(property) || this.symbol.resolve('field.creator.ecuser');
  }

  /** Returns a date group function. Uses 'moment.format.month' symbol */
  groupDate() {
    return (value) => moment(value).format(this.symbol.resolve('moment.format.month'));
  }

  /** Returns a date iso formatter */
  isoDate() {
    return (value) => moment(value).toISOString();
  }
}
