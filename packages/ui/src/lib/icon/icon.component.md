# Icon

[Open Demo](https://components.entrecode.de/ui/icons?e=1)

Displays an icon:

```html
<ec-icon name="add"></ec-icon>
```

ec-icon set uses [ixo](https://entrecode.github.io/ixo/) svg icons. You can see the icon names that are used by the components [here](https://github.com/entrecode/ec.components/blob/2e4c44505932fab63e399ab83ffa29e29f90e059/packages/ui/src/lib/icon/ec-icons.ts#L11). All ixo icons that are NOT used by the components must be defined in your app to have them available. This can be done using IconService and the [ixo site](https://entrecode.github.io/ixo/).

e.g. if you are using the names ```add-circle``` and ```alarm```, you can add them to your icon set like this:

```ts
// import { IconService } from '@ec.components/ui';

export class App {
  constructor(public iconService: IconService) {
    iconsService.set([
      {
        name: 'add-circle',
        path:
          'M15 11h-2v-2c0-0.55-0.45-1-1-1s-1 0.45-1 1v2h-2c-0.55 0-1 0.45-1 1s0.45 1 1 1h2v2c0 0.55 0.45 1 1 1s1-0.45 1-1v-2h2c0.55 0 1-0.45 1-1s-0.45-1-1-1zM12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8c4.411 0 8 3.589 8 8s-3.589 8-8 8zM12 2c-5.514 0-10 4.486-10 10s4.486 10 10 10c5.514 0 10-4.486 10-10s-4.486-10-10-10z',
      },
      {
        name: 'alarm',
        path:
          'M21.24 8.098l-4.24-4.238c0.541-0.531 1.282-0.86 2.099-0.86 1.657 0 3 1.343 3 3 0 0.817-0.329 1.557-0.859 2.098zM2.859 8.098c-0.53-0.541-0.859-1.281-0.859-2.098 0-1.657 1.343-3 3-3 0.817 0 1.558 0.329 2.099 0.86l-4.24 4.238zM15 12c0.552 0 1 0.447 1 1s-0.448 1-1 1h-3c-0.552 0-1-0.447-1-1v-3c0-0.553 0.448-1 1-1s1 0.447 1 1v2h2zM12 20c3.866 0 7-3.134 7-7s-3.134-7-7-7c-3.866 0-7 3.134-7 7s3.134 7 7 7zM12 22c-4.971 0-9-4.029-9-9s4.029-9 9-9c4.971 0 9 4.029 9 9s-4.029 9-9 9z',
      },
    ]);
  }
}
```

The path for each icon has to be copied from the [ixo site](https://entrecode.github.io/ixo/).
