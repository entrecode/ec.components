# Entry List

Entry List is a thin extension of ec-list. It handles loading entries from the datamanager and converting them to a List instance.

```html
<ec-entry-list model="muffin" [config]="{size:10}" [solo]="true" #muffinList></ec-entry-list>
```

## With Filter

Currently ec-filter is just a text input, but it will be applicable for each field type.

```html
<ec-filter (changed)="muffinList.filter('name',$event)"></ec-filter>
<ec-entry-list model="muffin" [config]="{size:10}" [solo]="true" #muffinList></ec-entry-list>
```