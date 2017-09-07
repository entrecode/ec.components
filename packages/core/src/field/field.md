# Field

A [Field](../../classes/Field.html) represents a property of an Object, without a specific value.
It is used to describe a column or field of one or multiple equally structured objects.
The field config (see [FieldConfigProperty](../../interfaces/FieldConfigProperty.html)) _can_ contain different transformation methods, such as:

- _resolve_: This method is used to resolve the field value from the object body.
It runs before all other transformation methods.
- _display_: Transforms the resolved value to a human readable output. It is used for e.g. in list cells.
- _group_: Should return a value that is suitable for grouping multiple different values together, like in a list.

Example Usage:

```ts
const field = new Field('name', {
    resolve: (body) => body.value.name,
    display: (value) => value.toUpperCase(),
    group: (value) => value.length + ' Buchstaben',
    sort: (value) => value.length
    });
const name = field.resolve({value:{name:'bobby'}}); // 'bobby'
field.display(name); // => 'Bobby'
field.group(name); // => '5 Buchstaben'
field.sort(name); // => 5
```
The above example is of course only viable to show the concept.
When using the components as a whole, those methods will be called automatically from Item, List or Form.
