import { List } from '@ec.components/core';
import { CoolStringComponent } from '../demo/app/form/cool-string.component';
import { songs } from '../demo/assets/songs';
import { UnsplashImageComponent } from '../demo/app/list/unsplash-image.component';

export const products = [
  {
    id: 'x1',
    name: 'Brush',
    price: 2,
    tags: ['tool', 'plastic', 'dirty']
  },
  {
    id: 'x2',
    name: 'Toilet',
    price: 100,
    tags: ['tool', 'water']
  },
  {
    id: 'x3',
    name: 'Toilet Seat',
    price: 20,
    tags: ['utility', 'plastic']
  }
];

export const mocked = {
  products,
  muffins: [
    {
      value: {
        name: 'Vanilla Fudge',
        cost: 10
      }
    }, {
      value: {
        name: 'Chocolate Dream',
        cost: 15
      }
    }, {
      value: {
        name: 'Strawberry Girlie',
        cost: 5
      }
    }
  ],
  people: [{ name: 'John' }, { name: 'Henry' }, { name: 'Maria' }],
  environment: {
    apiRoot: 'https://datamanager.entrecode.de/api/292b02f5',
    datamanagerID: '292b02f5',
    model: 'muffin'
  },
  lists: {
    products: new List(products, { identifier: 'id', label: 'name' }),
    songs: new List(songs.songs, {
      size: 10,
      fields: {
        picture: {
          label: 'Bild',
          resolve: (body) => body.music ? body.music.measures.length : 1,
          output: UnsplashImageComponent
        },
        music: {
          label: 'Akkorde',
          display: (value) => value.measures.reduce((chords, measure) => chords.concat(measure), []),
          sort: (value) => value ? value.measures.length : 0,
          view: 'tags'
        },
        title: {
          label: 'Titel',
          view: 'string',
          sortable: true,
        },
        composer: {
          label: 'Komponist',
          view: 'string',
          sortable: true,
        },
        style: {
          label: 'Stil',
          group: (value) => value,
          view: 'string',
          sortable: true,
        },
        key: {
          label: 'Tonart',
          group: (value) => value.replace('-', ''),
          view: 'string',
          sortable: true,
        },
        density: {
          label: 'Dichte',
          hidden: true,
          resolve: (body) => {
            return body.music ? (Math.round(body.music.measures.reduce((chords, measure) => chords.concat(measure), []).length / body.music.measures.length * 10) / 10) : 0;
          }
        },
        diversity: {
          label: 'Diversität',
          hidden: true,
          resolve: (body) => {
            return body.music ? (body.music.measures.reduce((chords, measure) => chords.concat(measure), []).filter((v, i, a) => a.indexOf(v) === i).length) : 0;
          },
          sortable: true,
        },
        difficulty: {
          label: 'Schwierigkeit',
          resolve: (body, item) => {
            return Math.round(item.resolve('diversity') * item.resolve('density'));
          },
          sortable: true,
          view: 'number',
          group: (value) => {
            if (value < 5) {
              return 'Käseleicht'
            }
            if (value < 10) {
              return 'Anfänger'
            }
            if (value < 30) {
              return 'Ganz nett'
            }
            if (value < 40) {
              return 'Fortgeschritten'
            }
            if (value < 50) {
              return 'Ordentlich'
            }
            if (value < 60) {
              return 'Profi'
            }
            return 'Hardcore'
          }
        },
      }
    }),
    trees: new List([
      {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }, {
        name: 'Appletree',
        height: 10,
        fruits: true
      }, {
        name: 'Lemontree',
        height: 8,
        fruits: true
      }, {
        name: 'Birch',
        height: 20,
        fruits: false
      }, {
        name: 'Cinnamon',
        height: 10,
        fruits: true
      }, {
        name: 'Papple',
        height: 8,
        fruits: true
      }, {
        name: 'Mapple',
        height: 20,
        fruits: false
      }, {
        name: 'ZZ',
        height: 20,
        fruits: false
      }, {
        name: 'Z',
        height: 20,
        fruits: false
      }, {
        name: 'aa',
        height: 20,
        fruits: false
      }, {
        name: 'ba',
        height: 20,
        fruits: false
      }], {
        size: 19,
        selectMode: true,
        storageKey: 'treeListConfig',
        fields: {
          name: {
            label: 'Name',
            view: 'string',
            required: true,
            input: CoolStringComponent,
            output: CoolStringComponent,
            sortable: true
          },
          height: {
            label: 'Höhe',
            group: (h) => h > 10 ? 'Höher als 10m' : 'Niedriger als 10m',
            view: 'number',
            required: true,
            validate: (value) => {
              if (value < 1) {
                return 'Der Wert muss positiv sein.'
              }
            },
            sortable: true
          },
          fruits: {
            label: 'Früchte',
            display: (value) => value ? 'ja' : 'nein',
            view: 'boolean',
            sortable: true,
            hideInColumnFilter: true,
            /* readOnly: true */
          },
          button: {
            label: 'Action',
            form: false,
            resolve: () => ' ',
            view: 'link',
            class: 'btn btn_outlined',
            icon: 'binoculars',
            action: (item, property) => {
              console.log('clicked button', item, property);
            }
          }
        },
      }),
    pop_test: new List([], {
      fields: {
        defaultClass: {
          label: 'default',
          filterable: true,
          view: 'string'
        },
        fullscreen: {
          filterPopClass: 'ec-pop_fullscreen',
          filterable: true,
          view: 'string'
        },
        dialog: {
          filterPopClass: 'dialog ec-pop_overlay',
          filterable: true,
          view: 'string'
        },
        'drawer-left': {
          filterPopClass: 'ec-pop_drawer-left',
          filterable: true,
          view: 'string'
        },
        'drawer-right': {
          filterPopClass: 'ec-pop_drawer-right',
          filterable: true,
          view: 'string'
        },
        'drawer-top': {
          filterPopClass: 'ec-pop_drawer-top',
          filterable: true,
          view: 'string'
        },
        'drawer-bottom': {
          filterPopClass: 'ec-pop_drawer-bottom',
          filterable: true,
          view: 'string'
        },
        'toast-top': {
          filterPopClass: 'ec-pop_toast-top',
          filterable: true,
          view: 'string'
        }
      }
    })
  }
};

export const muffinSchema = {
  '_links': { '$ref': 'https://entrecode.de/schema/hal#_links' },
  '_id': {
    'type': 'string',
    'pattern': '^[0-9A-Za-z-_]{7,14}$',
    'title': 'id',
    'description': 'Unique identifier for this entry.'
  },
  'id': {
    'type': 'string',
    'pattern': '^[0-9A-Za-z-_]{7,14}$',
    'title': 'id',
    'description': 'Unique identifier for this entry.'
  },
  'private': { 'type': 'boolean', 'description': 'Indicates if an entry was posted private.' },
  '_created': {
    'type': 'string',
    'format': 'date-time',
    'title': 'datetime',
    'description': 'Timestamp of the creation of this entry.'
  },
  'created': {
    'type': 'string',
    'format': 'date-time',
    'title': 'datetime',
    'description': 'Timestamp of the creation of this entry.'
  },
  '_creator': {
    'type': ['string', 'null'],
    'title': 'account',
    'description': 'Creator of this entry.'
  },
  'creator': {
    'type': ['string', 'null'],
    'title': 'account',
    'description': 'Creator of this entry.'
  },
  '_modified': {
    'type': 'string',
    'format': 'date-time',
    'title': 'datetime',
    'description': 'Timestamp of the last modification of this entry.'
  },
  'modified': {
    'type': 'string',
    'format': 'date-time',
    'title': 'datetime',
    'description': 'Timestamp of the last modification of this entry.'
  },
  '_modelTitleField': {
    'type': 'string',
    'description': 'Indicates which field is the title field of the model.'
  },
  '_modelTitle': {
    'type': 'string',
    'description': 'The title of the model this entry is part of.',
    'pattern': '^[a-zA-Z0-9_\\-]{1,256}$'
  },
  '_entryTitle': { 'description': 'Shorthand for entry title.' },
  'name': { 'type': 'string', 'title': 'text', 'description': 'Name of Muffin', 'default': '' },
  'amazement_factor': {
    'oneOf': [{ 'type': 'null' }, {
      'type': 'number',
      'minimum': 1,
      'maximum': 10,
      'multipleOf': 1
    }], 'title': 'number', 'description': 'How amazing is the Muffin?', 'default': null
  },
  'pictures': {
    'type': 'array',
    'items': {
      'oneOf': [{
        'type': 'string',
        'pattern': '^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$'
      }, {
        'type': 'object',
        'properties': {
          'assetID': {
            'oneOf': [{ 'type': 'null' }, {
              'type': 'string',
              'pattern': '^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$'
            }]
          }
        }
      }]
    },
    'title': 'assets',
    'description': '',
    'default': null
  }
};
