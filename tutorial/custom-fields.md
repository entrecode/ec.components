# Custom Field Configuration

## Add a model config

You can configure a models behaviour over the ModelConfigService.
It is recommended to configure a model in a parent component of all possible ec-crud lists or nested forms.

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


## Using custom inputs and outputs

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
    <input type="text" [formControl]="control">
  </div>
  <div *ngSwitchCase="'openingHours'">
    <!-- <ec-opening-hours [formControl]="control"></ec-opening-hours> -->
  </div>
</div>
```

Of course you could also switch based on property name or type, depending on your application.

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