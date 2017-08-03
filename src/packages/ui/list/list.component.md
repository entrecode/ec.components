# List

The List is one of the main components to work with.
The basic idea is to display collections of data in a structured but flexible way.

You can create a new List like this:

```typescript
this.trees = new List(
//first argument: Array of Objects
[{
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
}],
//second (optional) argument: ListConfig
{
  fields: {
    name: {
      label: 'Name'
    },
    height: {
      label: 'Height',
      group: (h) => h > 10 ? 'Higher than 10m' : 'Lower than 10m'
    },
    fruits: {
      label: 'Has Fruits?',
      display: (value) => value ? 'yes' : 'no'
    },
  }
})
```

This is how you display a List instance into your template:


```html
<ec-list [list]="trees"></ec-list>
```

## Templated List

You can customize each list field by using ec-field inside the ec-list.
The affected fields which should be templated can either be selected by property or by type.

```html
<ec-list [list]="songs" [solo]="true" #songList>
  <ec-field property="key">
    <ng-template let-value="value">
      <strong>{{value}}</strong>
    </ng-template>
  </ec-field>
  <ec-field property="picture">
    <ng-template let-item="item" let-value="value">
      <div class="ec-list-avatar">
        <img [src]="'https://unsplash.it/'+value*2+'/'+value">
      </div>
    </ng-template>
  </ec-field>
</ec-list>
```
