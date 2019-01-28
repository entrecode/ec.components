
# Angular7 update: BREAKING changes

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

## 1. All imports now go from the packages roots

old:

```ts
import { EntryForm } from '@ec.components/data/src/entry-form/entry-form.component'
```

new:

```ts
import { EntryForm } from '@ec.components/data'
```

=> make sure you never import anything from src, since this folder no longer exists in the package

### PRO TIP

Use VSCode "Search: Replace in Files" with the following Regex:

- Search: _'@ec.components/(\w+).*'_
- Replace: _'@ec.components/$1'_

## 2. SCSS import changes

old:

```scss
@import '~@ec.components/style/components';
```

new:

```scss
@import '~@ec.components/style/scss/components';
```

## 3. MediumModule has been renamed to MediumEditorModule

## 4. Build Errors

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