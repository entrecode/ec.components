# Icon

[Open Demo](https://components.entrecode.de/ui/icons?e=1)

Displays an icon:

```html
<ec-icon name="add"></ec-icon>
```

The default icon set uses [ec-icons](https://icons.entrecode.de/). You have to embedd them to your index.html (or similar):

```html
  <link rel="stylesheet" href="https://icons.entrecode.de/ec-icons-3.0.0.min.css" />
```

## Using another icon set

You can also use other icons:

```js
import { emojiIcons } from '@ec.components/ui/src/icon/emoji-icons';
export class SomeModule  {
    constructor(public iconService: IconService) {
        this.iconService.use(emojiIcons);
    }
}
```

## Overriding icons

You can also override the current icon registry:

```js
import { emojiIcons } from '@ec.components/ui/src/icon/emoji-icons';
export class SomeModule  {
    constructor(public iconService: IconService) {
        this.iconService.set(emojiIcons);
    }
}
```

This will override the icon registry with the given icons, but keep the rest.