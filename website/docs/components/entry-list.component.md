---
id: entry-list
title: Entry List
sidebar_label: Entry List
---

<!-- Related Doc:
- [All Possible field config properties](../../interfaces/FieldConfigProperty.html)
- [Default Type Config](../../injectables/TypeConfigService.html#source)
- [ListConfig](../../interfaces/ListConfig.html) (also see ItemConfig parent)
- [Item Doc](../core-classes/item.html) -->

Entry Lists load multiple entries from a model and display them in a paginated list. It supports load error notifications, loader, filtering, sorting and automatic reloading + many customizations.

## Basic Example

```html
<ec-entry-list model="muffin"></ec-entry-list>
```

The above snippet will either consume the config for muffin in ModelConfigService, or if no config is found, generate one from the model schema.

## Methods

### load

params:

- config

(Re)Loads the list.

```html
<ec-entry-list #muffinList model="muffin"></ec-entry-list>
```

```ts
this.muffinList.load();
```

#### load#config

```ts
this.muffinList.load({ sortBy: 'amazement_factor' });
```

## Outputs

### columnClicked

The columnClicked Output will be emitted when an entry is clicked. You get an Item containing the clicked entry as _\$event_:

```html
<ec-crud model="muffin" (columnClicked)="clickedMuffin($event)"></ec-crud>
```

now you could e.g. navigate to a detail page:

```ts
clickedMuffin(muffin: Item<EntryResource>) {
  this.router.navigate(['muffin', muffin.id()]);
}
```

See [Items](../core-concepts/items.md) for more info on the emitted object.

If you do not use the columnClicked Output, nothing will happen on click by default. If you want to edit the entry without a custom route/form, consider using [crud.component](./crud.component.md).

## Inputs

### config

```html
<ec-entry-list model="muffin" [config]="muffinListConfig"></ec-entry-list>
```

See [Config Pipeline](../core-concepts/config-pipeline.md) for other ways to pass configuration.

### config.hidePagination

If true, no pagination will be visible. Expects you to use ec-pagination somewhere else:

```html
<ec-entry-list #muffinList model="muffin" [config]="{hidePagination: true}"></ec-entry-list>
<!-- -->
<ec-pagination [pagination]="muffinList?.list?.pagination"></ec-pagination>
```

### config.disableHeader

If true, no list-header will be visible. This way you can render the list header on a different spot in your markup:

```html
<ec-list-header [list]="muffinList?.list"></ec-list-header>
<!-- -->
<ec-entry-list #muffinList model="deal" [config]="{disableHeader: true}"></ec-entry-list>
```

<!-- ### config.selectMode

If true, each list row will have select boxes that can be toggled: -->

### config.fields

See [Fields Config](../core-concepts/fields.md).
The fields option defines which fields should be visible, and how they should look and behave.
