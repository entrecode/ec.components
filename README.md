# ec.components

This is the main project for ec.components, written in Typescript and Angular.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.0.

## Modules

There are three main modules:

- *@ec.components/core*: contains core typescript classes (no angular, no datamanager)
- *@ec.components/ui*: contains core ui components (angular, no datamanager)
- *@ec.components/data*: contains ui components for datamanager (angular+datamanager)

The dependencies stack up from core to data (data > ui > core).
The packages sources are located at src/packages.

## Documentation

The main documentation is located at https://entrecode.github.io/ec.components/.

## Quick Get Started Guide

### Install:

```shell
npm i ec.components
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
