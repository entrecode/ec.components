---
id: config-options
title: Config API
sidebar_label: Config API
---

This document describes all the options of the config object, which is a powerful API the control list and form looks and behaviour. See [Config Pipeline](./config-pipeline.md) for more info on where to put your config.
This list contains all available config options. For a tutorial on how to use them, see

- [List API](./list-options)
- [Form API](./form-options)

## config.fields

The _fields_ config option determines which fields should be part of your application. Fields that are not included won't be loaded at all.

| option             | description                                                                                              | type                    | affects list            | affects form |
| ------------------ | -------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------- | ------------ |
| label              | column label in list-header                                                                              | string                  | column header           | input label  |
| classes            | class that is appended to list-header                                                                    | string                  | appended to each column | -            |
| placeholder        | input placeholder                                                                                        | string                  | filter input            | input        |
| form               | if false, the field will not be part of the form                                                         | boolean                 |                         | X            |
| list               | if false, the field will not be part of the list                                                         | boolean                 | X                       |              |
| hideInForm         | if true, the field will be hidden in the form                                                            | boolean                 |                         | X            |
| hideInList         | if true, the field will be hidden in the list                                                            | boolean                 | X                       |              |
| hideInColumnFilter | if true, the field will be hidden in the column filter of the list-header                                | boolean                 | X                       |              |
| filterable         | if true, the field can be filtered from the list-header                                                  | boolean                 | X                       |
| sortable           | if true, the field can be sorted from the list-header                                                    | boolean                 | X                       |
| filterOperator     | the filterOperator that should be used. See [sdk filter doc](https://entrecode.github.io/ec.sdk/#filter) | boolean                 | X                       |
| filterComponent    | custom component to be used for filtering                                                                | Component               | X                       |
| rawFilter          | if set, the filter value will used as is (without filter operator)                                       | boolean                 | X                       |
| columns            | how many columns are used by the field                                                                   | number 1-12             |                         | X            |
| immutable          | if true, the property won't be sent when saving                                                          | boolean                 |                         | X            |
| readOnly           | if true, the property won't be editable                                                                  | boolean                 |                         | X            |
| required           | if true, the field needs to be filled out                                                                | boolean                 |                         | X            |
| prefill            | prefill value for new entries                                                                            | any                     |                         | X            |
| input              | custom input component                                                                                   | Component               | filter input            | X            |
| output             | custom output component                                                                                  | Component               | X                       |
| inputView          | view for input component                                                                                 | string                  |                         | X            |
| resolve            | resolves value for transformation                                                                        | function                |                         |              |
| copy               | transformation to copy the fields value                                                                  | transformation function |                         |              |
| display            | transformation to display the fields value                                                               | transformation function | X                       |              |
| sort               | transformation to sort fields                                                                            | transformation function | X                       |              |
| group              | transformation to group the fields value when sorting                                                    | transformation function | X                       |              |
| queryFilter        | transformation for query param to filter value                                                           | transformation function | X                       |              |
| validate           | transformation for form validation                                                                       | transformation function |                         | X            |

## main options

| option               | type                                         | description                                                                                                                                       | affects list          | affects form                                    |
| -------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------------------------------------------- |
| title                | string                                       | For primitive values only: the title for the item                                                                                                 |
| identifier           | string                                       | The Property that is used to identify items from another (e.g. in a selection).                                                                   |
| identifierPattern    | RegExp                                       | Pattern of the identifier field. Is used e.g. in the searchbar                                                                                    |
| label                | string                                       | The Property that is used to display the item for humans                                                                                          |
| fields               | FieldConfig                                  | The Items field Config                                                                                                                            |
| type                 | string                                       | The type of the Item. It determines how it will be displayed in different contexts                                                                |
| resolve              | (body) > any                                 | Custom resolve path function. It can be used e.g. to access subbranches of an Object.                                                             |
| parent               | any                                          | Contains the parent Instance which inhabits the item. This property is set programmatically and therefore meant to be readonly.                   |
| onSave               | (item                                        | Item, value                                                                                                                                       | Object) - Promise / T | Callback that is invoked when the item is saved |
| onEdit               | (value / T) - Promise / T                    | Callback that is invoked before the item is edited                                                                                                |
| classes              | (item / Item) - string                       | This method can be used to set custom classes based on item contents. Used e.g. in list-items for row class                                       |
| title                | string                                       | For lists with primitive values only: the title of the list header                                                                                |
| sortBy               | string                                       | The property name that is sorted after                                                                                                            |
| sort                 | string[]                                     | Array of properties that is sorted after, experimental...                                                                                         |
| desc                 | boolean                                      | If set to true, the sorting will be descending                                                                                                    |
| selectMode           | boolean                                      | If true, the list will show its checkboxes and will select on column click. The columnClicked output will be ignored as long selectMode is active |
| disableSearchbar     | boolean                                      | If true, no select dropdown will be shown on ec-select                                                                                            |
| disableHeader        | boolean                                      | If true, the list will have no header.                                                                                                            |
| alwaysShowHeader     | boolean                                      | If true, the header will also be shown when the list is empty. Defaults to false                                                                  |
| disableDropdown      | boolean                                      | If true, no dropdown will be shown for a select                                                                                                   |
| disableRemove        | boolean                                      | If true, removal of items wont be possible (select)                                                                                               |
| disableColumnFilter  | boolean                                      | If true, no column filter will be shown in the list header                                                                                        |
| disableDrag          | boolean                                      | If true, select items cannot be dragged                                                                                                           |
| hidePagination       | boolean                                      | If true, the default pagination will not be visible.                                                                                              |
| page                 | number                                       | The current active page                                                                                                                           |
| size                 | number                                       | The number of items per page                                                                                                                      |
| availableSizes       | number[]                                     | The available sizes. If not set, the size cannot be changed                                                                                       |
| solo                 | boolean                                      | Should the selection be solo?                                                                                                                     |
| filter               | [key: string]: any; };                       | tells the list to show only items that match the filter                                                                                           |
| query                | [key: string]: any; };                       | a query that will be turned in to a filter                                                                                                        |
| maxColumns           | number                                       | Maximal visible columns. Defaults to 8                                                                                                            |
| popColumns           | number                                       | how many columns should the pop have?                                                                                                             |
| autoload             | boolean                                      | If true, the list will automatically load on change                                                                                               |
| storageKey           | string <!--  ((list: List<T>) => string) --> | The key that should store the lists config in the local storage. If set, the key will be populated on config changes.                             |
| display              | <!-- (items: Item<T>[]) => Item<T>[] -->     | Transforms the Items before they are displayed, e.g. to apply a filter for the view \*\*/                                                         |
| defaultFilter        | string                                       | If set, a filter input for the given field property will be shown by default                                                                      |
| dropdownFields       | FieldConfig                                  | The fields that are used in select dropdowns, defaults to label field only.                                                                       |
| singularLabel        | string                                       | The label for one entity                                                                                                                          |
| pluralLabel          | string                                       | The label for multiple entities                                                                                                                   |
| createLabel          | string                                       | The label for the entry create button                                                                                                             |
| methods              | get / put / post / delete                    | An Array of Methods that should be supported. Possible values are create, read, update and delete\*/                                              |
| loader               | LoaderComponent                              | An external loader component that should be used, falls back to internal.                                                                         |
| notifications        | NotificationsComponent                       | An external notifications component that should be used, falls back to internal                                                                   |
| develop              | boolean                                      | If true, an extra develop button will be shown\*/                                                                                                 |
| keepPopOpen          | boolean                                      | If true, the entry pop will remain open after the entry has been successfully saved.                                                              |
| levels               | number                                       | With how many levels should a list entry be loaded? Defaults to 1 (taking entry directly from the list, without loading)\*/                       |
| alwaysLoadEntry      | boolean                                      | If true, an entry is always loaded when opened, even with lvl1                                                                                    |
| permissions          |                                              | maps the permissions to the methods post put create delete                                                                                        |
| disableSelectSwitch  | boolean                                      | If true, no select mode switch will be shown                                                                                                      |
| disableListPop       | boolean                                      | If true, no list pop will be available at selects                                                                                                 |
| disableUrlUpload     | boolean                                      | If true, assets cannot be upload via url                                                                                                          |
| disableCreatePop     | boolean                                      | If true, no create pop will be available at selects                                                                                               |
| disableSearchbar     | boolean                                      | If true, no dropdown will be accessible                                                                                                           |
| disableRemove        | boolean                                      | If true, removal of items wont be possible (select)                                                                                               |
| deleteOnRemove       | boolean                                      | If true, selects will delete entries that are removed from the selection                                                                          |
| safeDelete           | boolean                                      | If true, delete operations need confirmation                                                                                                      |
| hideAssetGroupSelect | boolean                                      | Hides the assetGroup select in asset-list-pop                                                                                                     |
| fileOptions          | FileOptions                                  | Default options for file uploads                                                                                                                  |
| customUpload         | boolean                                      | If true, a pop will open before upload to set up custom options                                                                                   |
| popColumns           | number                                       | Defines the column width of the pops used. Defaults to popService.defaultColumns                                                                  |
| nestedPopActive      | boolean                                      | If true, a nested pop will be active immediately                                                                                                  |
| placeholder          | string                                       | Sets a placeholder. Used e.g. for empty entry-select                                                                                              |

## Complex Example

```js
export class MuffinsComponent {
  constructor(private modelConfig: ModelConfigService) {
    moment.locale('de'); //set moment locale

    this.modelConfig.set('muffin', {
      fields: {
        pictures: {
          label: 'Bilder' //this label is shown above the form field and in the table header
        },
        name: {
          label: 'Muffin Name',
          group: (name) => {
            return name[0].toUpperCase() //the return value is used to show group headers in a sorted list
          },
          required: true //when required, a new entry form cannot be saved without a value set for the field
        },
        _created: { //you can also access the system properties
          label: 'Erstellt',
          form: false, //this will hide the field inside the form
          group: (value) => moment(value).format('YYYY')
        },
        amazement_factor: {
          label: 'Amazement Faktor',
          display: (value) => { //this will transform the value for output e.g. in a list cell
            return (value * 10) + '%'
          },
          group: (value) => {
            return value > 5 ? 'Größer als 50%' : 'Kleiner als 50%';
          },
          validate: (value) => { //this function will run when validating the value inside a form
            if (typeof value !== 'number') {
              return; //value is valid
            }
            if (value < 1) {
              return 'Muss mindestens 1 sein'; //this message will be shown above the field
            } else if (value > 10) {
              return 'Darf maximal 10 sein';
            }
          }
        },
      }
    });
}
```
