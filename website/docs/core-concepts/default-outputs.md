---
id: default-outputs
title: Default List Fields
sidebar_label: Default List Fields
---

In the fields config, you can configure outputView to tell the components how a list field should be rendered. By default, the most common views are implemented in the components.
Most views are derived from the [field types of the entrecode API](https://doc.entrecode.de/data_manager/#types).


| outputView | for type         | description                | is default | specials                                       |
| ---------- | ---------------- | -------------------------- | ---------- | ---------------------------------------------- |
| tags       | entries          | tags                       | X          | expects array as display value                 |
| tag        | entry            | single tag                 | X          |
| boolean    | boolean          | checkbox icon              | X          |
| date       | datetime         | date display               | X          |                                                |
| email      | email            | mailto link                | X          |                                                |
| url        | url              | link                       | X          |                                                |
| color      | text             | color sample               |            |
| asset      | asset            | tape icon                  | X          |
| assets     | assets           | tape icon with asset count | X          |
| dmAsset    | dmAsset          | img icon                   | X          |
| dmAssets   | dmAsset          | img icon with asset count  | X          |
| avatar     | asset, dmAsset   | img avatar                 |            | expects url as display value                   |
| avatars    | assets, dmAssets | img avatars                |            | expects url array as display value             |
| preview    | asset, dmAsset   | img                        |            | expects url as display value                   |
| link       | -                | button custom action       |            | optional icon, class, expects action method to be set |
| textarea   | formattedText    | displays a "text" tag      | X          |
| json       | json             | displays a "JSON" tag      | X          |
| string     | text             | text display               | X          |

- see sources of [default-output](https://github.com/entrecode/ec.components/blob/master/packages/ui/src/lib/form/default-output/default-output.component.html)

## Examples

### link

To render a button with a custom action:

```ts
const muffinConfig = {
  fields: {
    /* .. */
    eat: {
      outputView: 'link',
      class: 'btn',
      action: (item) => {
        console.log('You took a bite! of ' + item.display());
      },
      icon: 'crumble',
      form: false, // or use immutable: true if you want the button in the form
    },
  },
};
```

Note that the property 'eat' does not need to exist on your muffin model. You can create any property you want, just make sure it isn't sent when saving (by using immutable: false or form: false).