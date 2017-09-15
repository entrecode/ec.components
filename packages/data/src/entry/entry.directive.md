# ec-entry

This directive can be used to load a single entry directly from the template:

```html
<h1 ecEntry model="muffin" entryId="SkXEhDZ5yW" #muffin="ecEntry"></h1>
{{muffin.entry?.name}}
```