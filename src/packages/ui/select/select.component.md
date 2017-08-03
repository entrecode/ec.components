# Select

Work in progress. You can pass an array of [items] that will be used for a selection instance.

```html
<ec-select [items]="products" [config]="productConfig" #ecSelect></ec-select>

{{ecSelect.selection.getIdentifiers() | json}}
```