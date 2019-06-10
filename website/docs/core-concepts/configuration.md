---
id: configuration
title: Configuration
sidebar_label: Configuration
---

There are many ways to configure the components behaviour.

## model configuration

The following ways can be used to configure a models behaviour in one or more components. You can apply those to any components that have a model input, like ec-crud, ec-entry-form and many more.


### by Component Input

By passing a config to a component input, only that component and its children are affected:

```html
<ec-crud model="muffin" [config]="muffinConfig"></ec-crud><!-- affected -->
<ec-crud model="muffin"></ec-crud><!-- not affected -->
```

### by ModelConfigService

Another way to configure a model is by using the ModelConfigService:

```ts
class AppComponent {
  constructor(public modelConfig: ModelConfigService) {
    this.modelConfig.set('muffin', {
      /* muffin config */
    })
  }
}
```

This will automatically set the configuration of **all** components that use the model muffin:

```html
<ec-crud model="muffin"></ec-crud><!-- is affected by model config -->
```

This method affects lists like the ones that can be opened from entry-selects, where you have no control over the template and therefor cannot pass a config directly.

You should always use this way for the default model config. Special behaviour for a single page should be set up by component input. 


### by field type

You can also set a global config for all fields of a certain type, using the FieldConfigService:

```ts
import MyFancyJsonEditorComponent from 'my-fancy-json-editor';

class AppComponent {
  constructor(public fieldConfig: FieldConfigService) {
    this.fieldConfig.set('json', {
      input: MyFancyJsonEditorComponent
    });
  }
}
```

If you now use a form with a field of type 'json', it will use "MyFancyJsonEditorComponent" to edit the field. This way of configuration is also recommended when using extra packages like the location-picker.

### by ec.editor

Inside the [ec.editor](https://e.entrecode.de) you can configure basic things like label, placeholder columns classes and input-views. Just go to the model config and open the "Frontend" tab of a field. 

This way of configuration can be used to alter a project without touching its code > no deployment needed. 

This will only work if you do not override the affected fields in your project directly (using the first two methods). This way of configuration should always be used in favor of the first two.


### configuration order

The configuration stacks like that

- configuration from editor (field.config)
- model-config
- type-config
- component config

each new config step is merged into the previous one (using Object.assign).

### TL;DR

use 
- editor to configure labels and placeholders
- type-config for location-picker and json fields
- model-config for the rest
- use component config only for single use cases

## resource config

For resource-lists and forms, the same rules apply, but you should use ResourceConfigService in place of ModelConfigService. The editor configuration is not available for resources.