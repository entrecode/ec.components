# ec-entries

This component can be used to load a list of entries from the template:

```html
<ul ecEntries model="muffin" [config]="{size:3}" #myMuffins="ecEntries">
  <li *ngFor="let muffin of myMuffins.items">
  {{muffin.name}}
  </li>
</li>
```
