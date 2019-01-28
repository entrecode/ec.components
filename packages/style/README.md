# @ec.components/style

This package contains all scss styles for the ec.components packages.

## Overview

- [CHANGELOG](https://entrecode.github.io/ec.components/additional-documentation/changelog/style-changelog.html)
- [x.ui](https://github.com/entrecode/x.ui)

## Installation

### Method A: With prebuilt CSS styles

If you are not using scss or you just want to add styles without hassle, just add this css to your index.html:

```html
<link href="https://unpkg.com/@ec.components/style@latest/default.css" rel="stylesheet"/>
```

### Method B: Custom Styles with SCSS

If you want to use your own styles, you can use scss to import and build the styles with [x.ui](https://entrecode.github.io/x.ui/):

#### 1. Install package

```sh
npm install @ec.components/style --save
```

This will also install x.ui.

#### 3. Add styles

Details on how to setup your config can be found in the [x.ui README](https://github.com/entrecode/x.ui#xui).

```scss
@import 'config';
@import '~x.ui/src/x.ui.scss';
@import '~@ec.components/style/scss/components';
```