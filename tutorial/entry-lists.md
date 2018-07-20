# ec-entry-list

Related Doc:
- [All Possible field config properties](../../interfaces/FieldConfigProperty.html)
- [Default Type Config](../../injectables/TypeConfigService.html#source)
- [ListConfig](../../interfaces/ListConfig.html) (also see ItemConfig parent)
- [Item Doc](../core-classes/item.html)

Entry Lists load multiple entries from a model and display them in a paginated list. It supports load error notifications, loader, filtering, sorting and automatic reloading + many customizations.

## Default Usage

```html
<ec-entry-list model="muffin"></ec-entry-list>
```

The above snippet will either consume the config for muffin in ModelConfigService, or if no config is found, generate one from the model schema.

## Passing a Config

The following snippet will assign the given config to the model/schema config:

```html
<ec-entry-list model="muffin" [config]="muffinListConfig"></ec-entry-list>
```

## columnClicked output

You can react to column clicks via the columnClicked output:

```html
<ec-entry-list model="muffin" (columnClicked)="select($event)"></ec-entry-list>
```

```ts
select(item) {
    console.log('entry',item.getBody(),item.id());
}
```

## Seperated header/items/pagination markup

If you need a seperation of the list-header -items and -pagination, you can use the sub components of list.component:

```html
<ec-list-header [list]="dealList?.list"></ec-list-header>
<!-- -->
<ec-entry-list model="deal" #dealList (columnClicked)="select($event)"
    [selection]="dealSelection"
    [config]="{disableHeader: true, hidePagination: true}"></ec-entry-list>
<!-- -->
<ec-pagination [pagination]="dealList?.list?.pagination"></ec-pagination>
```

## Create Custom Cells via transform methods

If you want to custom cell values that do not require a custom markup, you can use transforms

### display

The display transform method is used to display the value (say what?).
It is called from inside ec-output, which is used in list-cells and form readOnly fields.
You can change the display behaviour like this:

```ts
this.modelConfig.set('muffin', {
    fields: {
        amazement_factor: {
            display: (value, item) => {
                if(value===10) {
                    return 'AMAZING!';
                } else if(value > 7) {
                    return 'amazing';
                }
                return 'not so amazing';
            }
        }
    }
});
```

### group

You can use grouping to get a clearer outline over sorted data:

```ts
this.modelConfig.set('muffin', {
    fields: {
        amazement_factor: {
            group: (value, item) => {
                if(value===10) {
                    return 'AMAZING!';
                } else if(value > 7) {
                    return 'amazing';
                }
                return 'not so amazing';
            }
        }
    }
});
```

The syntax is the same as for display but the result is used as a group label when the property is sorted.

### resolve

The value that is passed to the transform methods like display, group etc. can be changed beforehand with the resolve method. NOTE: the params are different than for the transform methods:

```ts
this.modelConfig.set('muffin', {
    fields: {
        amazement_factor: {
            resolve: (body, item) => {
                if(body.amazement_factor === -1) {
                    return 0;
                }
                return body.amazement_factor;
            }
        }
    }
});
```

this will also affect your forms!

### pseudo properties via resolve

You can also define pseudo properties, meaning properties that do not exist on the original object:

```ts
this.modelConfig.set('muffin', {
    fields: {
        ranking: {
            resolve: (body, item) => body.amazement_factor*body.flavour/body.price
        }
    }
});
```

This comes in handy when you want to display a often combined value out of multiple values.

NOTE: pseudo properties should not be passed to the backend...

## Custom Cells via custom output component

If you want to custom cell values that do require a custom markup, you can use a custom output component:

```ts
this.modelConfig.set('muffin', {
    fields: {
        amazement_factor: {
            output: StrongComponent
        }
    }
});
```

In your strong.component.ts, you can inherit OutputComponent, giving you access to the field and item of your cell:

```ts
@Component({
  selector: 'app-strong',
  template: `<strong>{{item.resolve(field.property)}}</strong>`
})
export class StrongComponent extends OutputComponent {}
```

NOTE: customizing the output component will also change the look of forms using that config, if the property is set readOnly.

## Filtering Lists

By default, each column that hosts a filterable property contains a search icon in its header. If the property is filterable is defined either by the field config (filterable) or falls back to the backend types that support filters. The search icon will open a pop with a field type specific filter input inside.

### Custom Filtering

If you do not want that (currently pretty clunky) pop filters, you can set filterable to false and manually call list.load with the desired filter:

```html
<a (click)="muffinList.list.load({filter:{amazement_factor:10}})">
    show amazing muffins
</a>
<ec-entry-list #muffinList model="muffin"></ec-entry-list>
```

Clicking the link will now show all muffins with exactly amazement_factor 10.

### Custom filter operators

By default, the entry-list will filter the property by its default filterOperator (see type config). If you want to change the default operator you can set it in the config:

```ts
this.modelConfig.set('muffin', {
    fields: {
        amazement_factor: {
            filterOperator: 'from'
        }
    }
});
```

```html
<a (click)="muffinList.list.load({filter:{amazement_factor:5}})">
    show amazing muffins
</a>
<ec-entry-list #muffinList model="muffin"></ec-entry-list>
```

If you now click the link, all muffins with amazement_factor>=5 will be loaded.