import { List } from '../packages/core/list/list';
export const mocked = {
  products: [
    {
      id: 'x1',
      name: 'Brush',
      price: 2
    },
    {
      id: 'x2',
      name: 'Toilet',
      price: 100
    },
    {
      id: 'x3',
      name: 'Toilet Seat',
      price: 20
    }
  ],
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
    trees: new List([{
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
    }], {
      fields: {
        name: {
          label: 'Name'
        },
        height: {
          label: 'Höhe',
          group: (h) => h > 10 ? 'Höher als 10m' : 'Niedriger als 10m'
        },
        fruits: {
          label: 'Früchte',
          template: 'fff {{item[field]}}',
          display: (value) => value ? 'ja' : 'nein'
        },
      }
    }),
  }
};

export const muffinSchema = {
  "_links": { "$ref": "https://entrecode.de/schema/hal#_links" },
  "_id": {
    "type": "string",
    "pattern": "^[0-9A-Za-z-_]{7,14}$",
    "title": "id",
    "description": "Unique identifier for this entry."
  },
  "id": {
    "type": "string",
    "pattern": "^[0-9A-Za-z-_]{7,14}$",
    "title": "id",
    "description": "Unique identifier for this entry."
  },
  "private": { "type": "boolean", "description": "Indicates if an entry was posted private." },
  "_created": {
    "type": "string",
    "format": "date-time",
    "title": "datetime",
    "description": "Timestamp of the creation of this entry."
  },
  "created": {
    "type": "string",
    "format": "date-time",
    "title": "datetime",
    "description": "Timestamp of the creation of this entry."
  },
  "_creator": {
    "type": ["string", "null"],
    "title": "account",
    "description": "Creator of this entry."
  },
  "creator": {
    "type": ["string", "null"],
    "title": "account",
    "description": "Creator of this entry."
  },
  "_modified": {
    "type": "string",
    "format": "date-time",
    "title": "datetime",
    "description": "Timestamp of the last modification of this entry."
  },
  "modified": {
    "type": "string",
    "format": "date-time",
    "title": "datetime",
    "description": "Timestamp of the last modification of this entry."
  },
  "_modelTitleField": {
    "type": "string",
    "description": "Indicates which field is the title field of the model."
  },
  "_modelTitle": {
    "type": "string",
    "description": "The title of the model this entry is part of.",
    "pattern": "^[a-zA-Z0-9_\\-]{1,256}$"
  },
  "_entryTitle": { "description": "Shorthand for entry title." },
  "name": { "type": "string", "title": "text", "description": "Name of Muffin", "default": "" },
  "amazement_factor": {
    "oneOf": [{ "type": "null" }, {
      "type": "number",
      "minimum": 1,
      "maximum": 10,
      "multipleOf": 1
    }], "title": "number", "description": "How amazing is the Muffin?", "default": null
  },
  "pictures": {
    "type": "array",
    "items": {
      "oneOf": [{
        "type": "string",
        "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
      }, {
        "type": "object",
        "properties": {
          "assetID": {
            "oneOf": [{ "type": "null" }, {
              "type": "string",
              "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
            }]
          }
        }
      }]
    },
    "title": "assets",
    "description": "",
    "default": null
  }
};