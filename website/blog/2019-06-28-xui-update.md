---
title: x.ui Update
author: felixroos
authorURL: https://github.com/felixroos
authorImageURL: https://avatars2.githubusercontent.com/u/12023032?s=460&v=4
---

ec.components now landed on x.ui 10 🛬

## What's new

- Now using [ixo](https://entrecode.github.io/ixo/) svg icons instead of ec-icons.
- Now supporting dark and light mode!
- See [x.ui changelog](https://github.com/entrecode/x.ui/blob/develop/CHANGELOG.md)

## Upgrade Guide

### 1. Update versions

Use the following versions in your package.json:

- @ec.components/data#>=0.50.0
- @ec.components/ui#>=0.45.0
- @ec.components/style#>=0.23.0
- @ec.components/core#>=0.27.0
- @ec.components/core#>=0.27.0
- x.ui#>=10.0.0-beta.0

### 2. fix x.ui import path

In your styles.scss, change the x.ui import path from `@import '~x.ui/src/x.ui';` to `@import '~x.ui/scss/x.ui';`.

### 3. migrate components variables

- changed `$ec-notification-shadow` to `$ec-notification-elevation`

removed:

- `$ec-btn-save-style`
- `$ec-btn-delete-style`
- `$ec-output-mail-style`
- `$ec-output-avatar-size`
- `$ec-output-avatar-border`
- `$ec-output-avatar-style`
- `$ec-output-string-style`
- `$ec-output-tag-font-size`
- `$ec-output-tag-line-height`
- `$ec-output-tag-weight`
- `$ec-output-tag-background`
- `$ec-output-tag-color`
- `$ec-output-tag-min-height`
- `$ec-output-tag-padding-ratio`
- `$ec-output-tag-round`
- `$ec-output-tag-radius`
- `$ec-output-tag-style`
- `$ec-loader-size`
- `$ec-loader-style`
- `$ec-loader-track-width`
- `$ec-loader-track-color`
- `$ec-loader-racer-color`
- `$ec-loader-racer-animation`
- `$ec-loader-racer-animation-speed`
- `$ec-loader-racer-animation-behavior`
- `$ec-loader-overlay-background`
- `$ec-loader-overlay-style`

added:
- `$ec-list-header-hover-color`

### 4. migrate x.ui variables

See [x.ui changelog](https://github.com/entrecode/x.ui/blob/develop/CHANGELOG.md) on the changes.

## 5. Migrate from ec-icons to ixo

- The new ec-icon component now use svg icons instead of classnames for css icons. 
- This saves much space, because you only need to load the icons that are used.
- This also means you need to define all icons that are not [used by the components](https://github.com/entrecode/ec.components/blob/master/packages/ui/src/lib/icon/ixo.ts)

The following steps need to be done to upgrade the icons:

### 1. Remove ec-icons css link from your index.html:

```html
<link rel="stylesheet" href="https://icons.entrecode.de/ec-icons-6.0.1.min.css" />
```

### 2. Replace all uses of ec-icon class

Find all usages of ec-icon by using ec-icon class directly:

```html
<span class="ec-icon xyz"></span>
```

Replace with

```html
<ec-icon name="xyz"></ec-icon>
```

Note that `xyz` stands for the icon name that is used.

### 2. Fix changed icon names

#### Find all usages of ec-icon by ec-icon component:

```html
<ec-icon name="xyz"></ec-icon>
```

#### Find all names that are NOT one of:

```json
["add", "trash", "calendar", "filter", "eye-closed", "database", "save", "eye-open", "checkmark"]
```

#### define paths missing names by using [ixo site](https://entrecode.github.io/ixo/)

e.g. if you are using the names ```add-circle``` and ```alarm```, you can add them to your icon set like this:

```ts
import { IconService } from '@ec.components/ui';

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

This will add the given array to the existing icons that are [used by the components](https://github.com/entrecode/ec.components/blob/master/packages/ui/src/lib/icon/ixo.ts). You could also override existing icons.

The path can be found on the [ixo site](https://entrecode.github.io/ixo/) as the "d" attribute of the svg path, after clicking the desired icon.

## 6. Dark Mode

See ec.editor code on how to configure dark mode.