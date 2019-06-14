---
id: default-inputs
title: Default Form Inputs
sidebar_label: Default Form Inputs
---

In the fields config, you can configure inputView to tell the components how a form input should be rendered. By default, the most common views are implemented in the components.
Most views are derived from the [field types of the entrecode API](https://doc.entrecode.de/data_manager/#types).

| inputView         | for type                | description                     | is default | specials                                                 |
| ----------------- | ----------------------- | ------------------------------- | ---------- | -------------------------------------------------------- |
| string            | text                    | normal text input               | X          |
| textarea          | formattedText           | textarea input                  | X          |
| number            | number + decimal        | number input                    | X          |
| color             | text                    | HTML5 color input               |            |
| boolean           | boolean                 | checkbox                        | X          |
| email             | email                   | email input                     | X          |
| url               | url                     | url input                       | X          |
| toggle            | checkbox (not defa ult) |                                 |
| date              | datetime                | ec-datetime                     | X          |
| select            | text                    | html select                     |            | values                                                   |
| copy              | any                     | click to copy                   |            | uses copy transformation                                 |
| phone             | phone                   | phone input                     | X          |                                                          |
| entry-select      | entry                   | shows entry-select              | X          | expects validation to be set to model title              | can pass nestedCrudConfig |
| entries-select    | entries                 | shows entry-select              | X          | expects validation to be set to model title              | can pass nestedCrudConfig |
| entries-actionbar | entries                 | shows actionbar                 |            | works without validation                                 |
| entry-list-select | entries                 | renders entry-list of selection |            | will load the entry with levels 2 request                |
| asset-select      | asset                   | single asset select             | X          | for legacyAssets (no assetGroup set in field validation) |
| assets-select     | assets                  | multiple assets select          | X          | for legacyAssets (no assetGroup set in field validation) |
| dmAsset-select    | dmAsset                 | single dmAssets select          | X          | expects validation to be set to assetGroupID             |
| dmAssets-select   | dmAssets                | multiple dmAssets select        | X          | expects validation to be set to assetGroupID             |

not passing an inputView will use the default inputView. If you pass an invalid inputView (not existing), the field's value will be displayed.

sources:

- [default-input](https://github.com/entrecode/ec.components/blob/master/packages/ui/src/lib/form/default-input/default-input.component.html)
- [default-entry-input](https://github.com/entrecode/ec.components/blob/master/packages/data/src/lib/entry-form/default-entry-input.component.html)

## Examples

### entry-select + entry-selects

As you see above, entry/entries fields will default to inputViews entry-select / entries-select. You can customize the entry select via nestedCrudConfig, which is passed to the entry-select:

```ts
bakerConfig = {
  fields: {
    /* other fields */
    baked_muffins: { // entries field
      nestedCrudConfig: {
        disableSearchbar: true
        disableDrag: true
        disableRemove: true
        disableSearchbar: true
        disableCreatePop: true
        /* or use methods */
        methods: ['get','put','post','delete']
      }
    }
  }
}
```

The nestedCrudConfig is also passed down to the children of entry-select: entry-list-pop & entry-pop. You could of course also pass a fields config but it is recommended you use ModelConfigService. See [Configuration](configuration#by-modelconfigservice) for details.

### select

To render a html select with options:

```ts
const muffinConfig = {
  fields: {
    /* .. */
    country: {
      outputView: 'select',
      values: ['Germany', 'USA', 'Kongo'],
    },
  },
};
```

### copy

To render a copyable date:

```ts
const muffinConfig = {
  fields: {
    /* .. */
    _created: {
      outputView: 'copy',
      copy: (value) => moment(value).toISOString(),
    },
  },
};
```

This uses the copy transform to turn the date into an iso string before copying. If you do not define a copy transform, the value will be copied as is (as returned by resolve).

## Setting inputView from the editor

In the model field config of the [ec.editor](https://e.entrecode.de), you can also select a default inputView in the frontend tab. Currently, this is only possible for entries fields, but will be available for more in the future (TODO: add inputViews to type-config.service).
