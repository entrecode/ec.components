---
id: form-options
title: Form API
sidebar_label: Form API
---

This document shows which config options can be used to control forms.

## Example

For all following snippets, let's assume the following template

```html
<ec-entry-form model="muffin" [config]="muffinConfig" #muffinForm></ec-entry-form>
```

... made available:

```ts
class AppComponent {
  @ViewChild('muffinForm') muffinForm;
  muffinConfig = {
    /* config here */
  };
}
```

Note: Forms could also appear inside other components like [ec-crud](../components/crud.component.md) and ec-entry-select. The techniques also apply to those forms.

Also check out [Config Pipeline](./config-pipeline.md) for other ways to set the config.

## form options

The following field options control the forms looks/behaviour:

| option      | description                                      | type                    |
| ----------- | ------------------------------------------------ | ----------------------- |
| label       | label above input                                | string                  |
| placeholder | input placeholder                                | string                  |
| form        | if false, the field will not be part of the form | boolean                 |
| hideInForm  | if true, the field will be hidden in the form    | boolean                 |
| columns     | how many columns are used by the field           | number 1-12             |
| immutable   | if true, the property won't be sent when saving  | boolean                 |
| readOnly    | if true, the property won't be editable          | boolean                 |
| required    | if true, the field needs to be filled out        | boolean                 |
| prefill     | prefill value for new entries                    | any                     |
| input       | custom input component                           | Component               |
| inputView   | view for input component                         | string                  |
| validate    | transformation for form validation               | transformation function |


