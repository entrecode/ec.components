---
id: custom-outputs
title: Custom List Fields
sidebar_label: Custom List Fields
---

## transforms

If you want to custom field behaviour, that does not require a custom markup, you can use transforms.

### display

The display transform method is used to display the value (say what?).
It is called from inside ec-output, which is used in list-cells.
You can change the display behaviour like this:

```ts
this.modelConfig.set('muffin', {
  fields: {
    amazement_factor: {
      display: (value, item) => {
        if (value === 10) {
          return 'AMAZING!';
        } else if (value > 7) {
          return 'amazing';
        }
        return 'not so amazing';
      },
    },
  },
});
```

Now, each muffin's amazement_factor will be replaced by the labels defined above.

### group

You can use grouping to get a clearer outline over sorted data:

```ts
this.modelConfig.set('muffin', {
  fields: {
    amazement_factor: {
      group: (value, item) => {
        if (value === 10) {
          return 'AMAZING!';
        } else if (value > 7) {
          return 'amazing';
        }
        return 'not so amazing';
      },
    },
  },
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
        if (body.amazement_factor === -1) {
          return 0;
        }
        return body.amazement_factor;
      },
    },
  },
});
```

this will also affect your forms!

### pseudo properties via resolve

You can also define pseudo properties, meaning properties that do not exist on the original object:

```ts
this.modelConfig.set('muffin', {
  fields: {
    ranking: {
      resolve: (body, item) => (body.amazement_factor * body.flavour) / body.price,
    },
  },
});
```

This comes in handy when you want to display a often combined value out of multiple values.

NOTE: pseudo properties should not be passed to the backend. Use immutable: true for hide the field from the form via form: false.

## Custom Markup

If you want to custom cell values that do require a custom markup, you can use a custom output component:

```ts
this.modelConfig.set('muffin', {
  fields: {
    amazement_factor: {
      output: StrongComponent,
    },
  },
});
```

In your strong.component.ts, you can inherit OutputComponent, giving you access to the field and item of your cell:

```ts
@Component({
  selector: 'app-strong',
  template: `
    <strong>{{ item.resolve(field.property) }}</strong>
  `,
})
export class StrongComponent extends OutputComponent {}
```
