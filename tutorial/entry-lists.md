# ec-entry-list

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
It is called from inside ec-ouput, which is used in list-cells and form readOnly fields.
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
```.

NOTE: customizing the output component will also change the look of forms using that config, if the property is set readOnly.