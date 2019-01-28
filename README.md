# ec.components

This project contains all sorts of angular components for creating data driven applications.
It is mainly used for entrecode admin applications in combination with the [entrecode](https://doc.entrecode.de) using [ec.sdk](https://github.com/entrecode/ec.sdk).

## Packages

## Main Packages

- @ec.components/core: contains core typescript classes (no angular/datamanager)
- @ec.components/ui: contains core ui components (not datamanager specific)
- @ec.components/data: contains ui components for [datamanager](https://doc.entrecode.de).
- @ec.components/style: contains styles for all components, built on [x.ui](https://entrecode.github.io/x.ui/).

The dependencies stack up from core to data (data > ui > core). You could also omit data, using just the ui components.

## Optional Packages

- @ec.components/calendar: contains calendar components, uses [moment](https://github.com/moment/moment).
- @ec.components/location: wraps [angular-google-maps](https://github.com/SebastianM/angular-google-maps).
- @ec.components/tinymce: wraps [tinymce wysiwyg editor](https://github.com/tinymce/tinymce).
- @ec.components/medium-editor: wraps [medium wysiwyg editor](https://github.com/yabwe/medium-editor).
- @ec.components/ace: wraps [ace code editor](https://github.com/ajaxorg/ace).

## Documentation

The main documentation is located at [entrecode.github.io/ec.components](https://entrecode.github.io/ec.components/). You can find a getting started guide there.

## Demo

A Demo is available at [components.entrecode.de](https://components.entrecode.de).

## Angular7 update: BREAKING changes

The following breaking changes need to be considered when updating the components with angular 7. This update guide is just for @ec.components and angular 7. A whole angular 7 update guide can be found [here](https://update.angular.io/).
Angular 7 is used since the following versions:

- @ec.components/ace@0.6.0
- @ec.components/calendar@0.2.0
- @ec.components/core@0.19.0
- @ec.components/data@0.42.0
- @ec.components/location@0.18.0
- @ec.components/medium-editor@0.4.0
- @ec.components/style@0.21.0
- @ec.components/tinymce@0.5.0
- @ec.components/ui@0.36.0

It is recommended you use the most recent versions. *Also add @ec.components/calendar to your package.json if you use datetime pipe or calendars / date pickers*.

### 1. All imports now go from the packages roots

old:

```ts
import { EntryForm } from '@ec.components/data/src/entry-form/entry-form.component'
```

new:

```ts
import { EntryForm } from '@ec.components/data'
```

=> make sure you never import anything from src, since this folder no longer exists in the package

#### PRO TIP

Use VSCode "Search: Replace in Files" with the following Regex:

- Search: _'@ec.components/(\w+).*'_
- Replace: _'@ec.components/$1'_

### 2. SCSS import changes

old:

```scss
@import '~@ec.components/style/components';
```

new:

```scss
@import '~@ec.components/style/scss/components';
```

### 3. MediumModule has been renamed to MediumEditorModule

### 4. Build Errors

If you are getting this:

```sh
ERROR in ./node_modules/eventsource/lib/eventsource.js
Module not found: Error: Can't resolve 'http' in '/your-project/node_modules/eventsource/lib'
ERROR in ./node_modules/eventsource/lib/eventsource.js
Module not found: Error: Can't resolve 'https' in 'your-project/node_modules/eventsource/lib'
ERROR in ./node_modules/jsonpath-plus/lib/jsonpath.js
Module not found: Error: Can't resolve 'vm' in 'your-project/node_modules/jsonpath-plus/lib'
```

To fix it, you need a custom webpack config. Eject is not available any more so we need to use angular-builders:

```sh
npm i @angular-builders/custom-webpack @angular-builders/dev-server @angular-devkit/build-angular --save-dev
```

The following versions were used in this guide:

```sh
"@angular-builders/custom-webpack": "^7.2.0",
"@angular-builders/dev-server": "^7.2.1",
"@angular-devkit/build-angular": "^0.12.3",
```

In angular.json make following changes -

```json
"architect": {
    "build": {
        "builder": "@angular-builders/custom-webpack:browser",
        "options": {
        "customWebpackConfig": {"path": "./custom-webpack.config.js"},
```

Notice change in builder and new option customWebpackConfig. Also change

```json
"serve": {
    "builder": "@angular-builders/dev-server:generic",
```

Now create a _custom-webpack.config.js_ file in the root directory, containing:

```js
const path = require("path");
module.exports = {
    node: {
        crypto: 'empty',
        fs: 'empty',
        http: 'empty',
        https: 'empty',
    }
};
```

Check [this](https://stackoverflow.com/questions/39187556/angular-cli-where-is-webpack-config-js-file-new-angular6-does-not-support-ng-e) for more info.

## Other Problems you might run into

- [Can't bind to 'ngModel' since it isn't a known property of 'input'](https://stackoverflow.com/questions/38892771/cant-bind-to-ngmodel-since-it-isnt-a-known-property-of-input)


## Developing with Lerna + Yarn Workspaces

The repository is a monorepo, managed by [lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).
All folders inside dist + packages/style will be used as symlinks in node_modules/@ec.components/*.
You can update the symlinks by running yarn (e.g. after adding a new package).

## Dev Setup

After a fresh clone of the repo, run this:

```sh
yarn install
npm run dev-setup
npm run start
```

The dev-setup script builds all packages and symlinks them to the node_modules.

### Publishing

Run publish task and select versions:

```sh
npm run publish
```

To publish a new package for the first time, make sure you run ```npm publish --access=public``` before running lerna. See add-new-package for more info on creating a new package.

Make sure using [Conventional Commits](https://www.conventionalcommits.org).

## Default README

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

[Impressum & Datenschutz](https://entrecode.de/datenschutz)
