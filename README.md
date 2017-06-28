# ec.components

This is the main project for ec.components, written in Typescript and Angular.

## Modules

There are three main modules:

- *@ec.components/core*: contains core typescript classes (no angular, no datamanager)
- *@ec.components/ui*: contains core ui components (angular, no datamanager)
- *@ec.components/data*: contains ui components for datamanager (angular+datamanager)

The dependencies stack up from core to data (data > ui > core).
The packages sources are located at src/packages.

There is also a fourth module called ```*@ec.components/styles*```.
It contains more sophisticated styles for ui components using xlcss.

## Documentation

The main documentation is located at https://entrecode.github.io/ec.components/.

## Demo

A Demo is available at https://components.entrecode.de/.

## Get Started

### Install:

You can install all three modules like this:

```shell
npm i @ec.components/core @ec.components/ui @ec.components/data
```

Then you can import the ui and data modules to your app module:

```typescript
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UiModule } from '@ec.components/ui';
import { DataModule } from '@ec.components/data';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    UiModule,
    DataModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### Set up Datamanager with environment

The Datamanager Class is a Singleton that holds an instance of the [ec.datamanager SDK](https://github.com/entrecode/ec.datamanager.js).
You can feed it with an environment like this:

```js
 import { Datamanager } from '@ec.components/data';
 import { environment } from '../environments/environment';
 //environment minimum: { apiRoot: 'https://datamanager.cachena.entrecode.de/api/XXxxXXxx' }
 Datamanager.useEnvironment(environment);
 Datamanager.api().model('baker').entries(); //use sdk
```

## UI Components

Here is a short breakdown of some of the classes and components you can use.

- *ec-list*: Smart datatable.
- *ec-pagination*: Pagination that can be used with ec-list.
- *ec-tabs*: Tabs with arbitrary content.
- More coming soon!

For more infos, look at the doc: https://entrecode.github.io/ec.components/.

## Styles

In main style.scss, import the following:

```
@import "../node_modules/xlcss/sass/xlcss";
@import "../node_modules/@ec.components/ui/styles";
```

## Icons

The ui and data packages both use [ec-icons](https://icons.entrecode.de/).
Just add this to your index.html:

```html
<link rel="stylesheet" href="https://icons.entrecode.de/ec-icons-1.1.1.min.css"/>
```

# Development
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.0.

## Lerna
The repository is a monorepo, managed by [lerna](https://github.com/lerna/lerna).

## Developing with Symlinks

When developing ec.components inside another project, it is recommended to use symlinks via npm link:
1. Inside the ec.components project go to ```cd src/packages/ui```
2. Then run ```npm link```
3. Inside the foreign project, link via ```npm link @ec.components/ui```

The same procedure can be applied for the ec.components packages.

## Import Structure
All imports inside src/packages that import from the same package or another ec.components package must be relative.
- Imports from the same package should always import the index file "from '..'"
    - This implies that all components/classes etc are placed inside a flat subfolder structure.
    - The relative path '..' therefore links to the index.ts where all package exports are defined.
- Imports from another package should always import the relative path to the package index (e.g. ../../packages/core)

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Use the `--env=prod` or `--env=stag` for environment builds.
CAUTION: you may have to "es2015" in tsconfig.json / lib to make UglifyJS work
see https://github.com/mishoo/UglifyJS2/issues/659

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
