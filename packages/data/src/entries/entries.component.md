# ec-entries

This component can be used to load a list of entries from the template:

```html
<ec-entries model="muffin" [config]="{size:3}" #myMuffins></ec-entries>
{{myMuffins.entries().length}} MUFFINS!
<ul>
  <li *ngFor="let m of myMuffins.entries()">{{m.display('name')}}</li>
</ul>
```
