# List

[List](../../classes/List.html) is a Collection with list specific features:

- It instantiates each array value as an Item
- It instantiates each field property config as a Field.
- It supports getting items by identifier via the id method (if identifier is set)
- It supports filtering, sorting, grouping and pagination.

```ts
this.trees = new List([{
  name: 'Appletree',
  height: 10,
  fruits: true
}, {
  name: 'Lemontree',
  height: 8,
  fruits: true
}, {
  name: 'Birch',
  height: 20,
  fruits: false
}, {
  name: 'Cinnamon',
  height: 10,
  fruits: true
}], {
  size: 3,
  fields: {
    name: {
      label: 'Name',
      view: 'string',
      required: true,
      input: CoolStringComponent,
      output: CoolStringComponent
    },
    height: {
      label: 'Höhe',
      group: (h) => h > 10 ? 'Höher als 10m' : 'Niedriger als 10m',
      view: 'number',
      required: true,
      validate: (value) => {
        if (value < 1) {
          return 'Der Wert muss positiv sein.'
        }
      }
    },
    fruits: {
      label: 'Früchte',
      display: (value) => value ? 'ja' : 'nein',
      view: 'boolean'
    },
  },
});
```

Here is an easy example of using a List instance in a template with Angular:
```html
<ul>
    <li *ngFor="let tree of trees.items">
        {{tree.display('name')}}
        Früchte? {{tree.display('fruits')}}
    </li>
</ul>
<button (click)="trees.toggleSort('name')">Nach Name sortieren</button>
```

For all the features, have a look at the [List](../../classes/List.html) documentation.
