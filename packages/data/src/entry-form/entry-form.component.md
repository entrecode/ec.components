# Entry Forms

Related Doc:
- [All Possible field config properties](../../interfaces/FieldConfigProperty.html)
- [Default Type Config](../../injectables/TypeConfigService.html#source)
- [ListConfig](../../interfaces/ListConfig.html) (also see ItemConfig parent)
- [Item Doc](../core-classes/item.html)

Entry forms can edit and create entries. They support notifications, loader, validation error handling and dynamic config generation out of the box.
NOTE: it is expected you have placed a ec-notifications tag somewhere in your root component.

## Default Behaviour

### Create

```html
<ec-entry-form model="muffin"></ec-entry-form>
```

submitting the form will create a new entry and then switch to edit mode.

### Edit

```html
<ec-entry-form model="muffin" [entry]="muffinEntry"></ec-entry-form>
```

### Dynamic Edit/Create from template

You can also access the form from the template and call edit or create:

```html
<ec-entry-form model="muffin" #muffinForm></ec-entry-form>
<ul ecEntries model="muffin" #muffinList="ecEntries">
    <li *ngFor="let muffin of muffinList.items">
      <a (click)="muffinForm.edit(muffin)">{{muffin.name}}</a>
    </li>
  </ul>
<a class="btn" (click)="muffinForm.create()">Create new Muffin</a>
```

## Configuration

If nothing else is configured, the form will parse the schema of muffin and generate a generic field config.
If you configured the model via ModelConfigService (see [Custom Fields](./custom-fields.html)), the form will use that config.
Alternatively, you can also pass a config directly:

```html
<ec-entry-form model="muffin" [config]="formConfig"></ec-entry-form>
```

The given config will be Object.assigned to the possible preexisting modelConfig.

## Custom Markup with ec-input/ec-output

Most times, you'll want more freedom over your forms markup etc. This is where ec-input and ec-output come into play:

```html
  <ec-entry-form model="muffin" #form>
    <!-- input -->
    <label>Title
        <ec-input property="title" [item]="form.form" [group]="form.group"></ec-input>
    </label>
    <!-- output -->
    <label>Amazement Factor</label>
    <ec-output property="amazement_factor" [item]="form.form" [group]="form.group"></ec-output>
    <a class="btn" (click)="form.submit()">Submit</a>
  </ec-entry-form>
```

As soon as the ec-entry-form contains elements (or you pass empty=true, as meantioned below), the contents will be rendered instead of the default form.

Features you have to add manually (if needed)

- submit button
- field.readOnly handling (show ec-output instead of ec-input)
- local ec-loader

NOTE: dont wrap labels around complex input components, because they fire ghost clicks!

## Custom input/output markup

Of course you can remove another layer of abstraction to further customize the form:

```html
  <ec-entry-form model="muffin" #form>
    <!-- input -->
    <label>Title</label>
    <input type="text" [formControl]="form.group.get('title')"/>
    <ec-input-errors [control]="form.group.get('title')"></ec-input-errors>
    <!-- output -->
    <label>Amazement Factor</label>
    {{form.display('amazement_factor')}}

    <a class="btn" (click)="form.submit()">Submit</a>
  </ec-entry-form>
```

Features you have to add manually:

- handling of input errors (ec-input-errors)
- making sure your markup handles the field type correctly
- making sure your markup handles the field value correctly

It is generally recommended to use ec-input over hard coded forms.

### The empty flag

You can also place the ec-input elements somewhere else and just tell the ec-entry-form that it shouldn't render the default form with the empty flag:

```html
<ec-entry-form model="muffin" [empty]="true" #form></ec-entry-form>
<ec-input property="title" [item]="form.form" [group]="form.group"></ec-input>
```

NOTE: Always make sure the property accessed by ec-input is also present in your config (or you dont use a config at all). Otherwise, the input wont know what to render.



## Creating custom inputs

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
<div [ngSwitch]="field.view" *ngIf="group" [formGroup]="group">
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

## Custom Form Controls

Now what if you want to use a custom form control that does not rely on primitve inputs like number or text?
In the above custom-input.component template, we use <ec-opening-hours> with a formControl input.
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
export class OpeningHoursComponent extends InputComponent implements ControlValueAccessor {

  writeValue(value: any) {
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

Now you can implement your own logic and call propagateChange when you change the value from your component, and react to change via the writeValue method!
You now could also use your component with ngModel or formControl in another context!
More information on this pattern: https://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html

## EXPERIMENTAL: Custom Fields without wrapper

You can now also use custom components as input directly without needing to wrap them explicitly.
What you need to is:

1. Extend DefaultInputComponent

```js
export class JsonEditorComponent extends extends DefaultInputComponent
```

2. add the input component as member variable:

```js
/** Form input component */
input: InputComponent;
```

and propagate the change to the input as well:

```js
this.propagateChange(this.value);
if (this.input) { // this is the important part
 this.input.propagateChange(this.value);
}
```

input will be defined when the component is used as input component inside ec-form.