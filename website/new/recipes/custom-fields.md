# Custom Field Configuration

Related Doc:
- [All Possible field config properties](../../interfaces/FieldConfigProperty.html)
- [Default Type Config](../../injectables/TypeConfigService.html#source)
- [ListConfig](../../interfaces/ListConfig.html) (also see ItemConfig parent)
- [Item Doc](../core-classes/item.html)

## Example

You can configure a models behaviour over the ModelConfigService.
It is recommended to configure a model in a parent component of all possible ec-crud lists or nested forms.

See the related doc links for default values / possible config values.

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