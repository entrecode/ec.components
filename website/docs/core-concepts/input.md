---
id: input
title: Form Inputs
sidebar_label: Form Inputs
---

## Default Form Inputs

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

## Custom Input


If you want a field input that is not supported by the [default inputs](#default-form-inputs), you can use this recipe.

### 1. Create Custom Input Component

```sh
ng g c custom-input
```

This component will serve as a container for all possible custom input fields.

### 2. Extend InputComponent (custom-input.component.ts)

To make the current field information available to the template, you need to extend InputComponent from @ec.components/ui:

```js
import { Component } from '@angular/core';
import { InputComponent } from '@ec.components/ui';

@Component({
  selector: 'clubapp-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent extends InputComponent {
}
```

CMD+Click on InputComponent to see which properties you can now use!

### 3. Add Markup (custom-input.component.html)

Now we can decide which custom input should be used, based on e.g. the fields view value:

```html
<div [ngSwitch]="field.getView('input')" *ngIf="group" [formGroup]="group">
  <ec-input-errors [control]="group.get(field.property)"></ec-input-errors>
  <div *ngSwitchCase="'speakingurl'">
    <input [id]="field.id" type="text" [formControl]="control">
  </div>
  <div *ngSwitchCase="'openingHours'">
    <!-- <ec-opening-hours [formControl]="control"></ec-opening-hours> -->
  </div>
</div>
```

Of course you could also switch based on property name or type, depending on your application.
The id property of field is referenced in the label of the form. By adding it to the input makes sure your label click enters the input.

### 4. Add CustomInputComponent to entryComponents:

Because the custom component will be loaded dynamically, your module needs to declare it as entryComponent:

```js
@NgModule({
  entryComponents: [
    CustomInputComponent
  ]
  /** more stuff **/
})
export class AppModule {
}
```

### 5. Add CustomInputComponent to field config:

Now you can add the Component as input to your field config:

```js
this.modelConfig.set('muffin', {
      fields: {
        url: {
          label: 'URL',
          view: 'speakingurl',
          input: CustomInputComponent
        },
        openingHours: {
          label: 'Öffnungszeiten',
          view: 'openingHours',
          input: CustomInputComponent
        }
})
```

By changing the view option, we can now decide which case will be met!

### Custom Form Controls via ControlValueAccessor

In the above custom-input.component template, we use *ec-opening-hours* with a formControl input.
To have access to the form control's value, you need to provide a ControlValueAccessor:

```js
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputComponent } from '@ec.components/ui';

@Component({
  selector: 'ec-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OpeningHoursComponent),
      multi: true
    }
  ]
})
```

Now you can implement your own logic and call propagateChange when you change the value from your component, and react to change via the writeValue method!
You now could also use your component with ngModel or formControl in another context!
More information on this pattern: https://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html

### Custom Fields without wrapper

You can also use custom components as input directly without needing to wrap them in "CustomFieldsComponent".
Just make sure you implement ControlValueAccessor like above. When changes occur from the template, call propagateChange. You can react to outside model changes in writeValue.

```typescript
import { Component, OnInit, Input } from '@angular/core';
import { InputComponent } from '../../../packages/ui';
import { ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'ec-counter',
    templateUrl: './counter.component.html'
})

export class CounterComponent extends InputComponent implements ControlValueAccessor {

    value = 0;

    increment() {
        this.propagateChange(++this.value);
    }

    decrement() {
        this.propagateChange(--this.value);
    }

    writeValue(value: any) {
        this.value = value;
        console.log('received value', value);
    }

    propagateChange = (_: any) => {
    };

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {
    }

}
```