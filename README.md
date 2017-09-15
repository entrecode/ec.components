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
It contains more sophisticated styles for ui components using x.ui.

## Documentation

The main documentation is located at https://entrecode.github.io/ec.components/.
You can find a getting started guide there

## Demo

A Demo is available at https://components.entrecode.de/.

# Development
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.0.

## Lerna
The repository is a monorepo, managed by [lerna](https://github.com/lerna/lerna).

## Developing with Symlinks

The start npm script will automatically use the symlinks from src/packages for @ec.components.
It also deletes eventually existing node_modules folders inside the packages.
This enables you to always use imports like: import * from '@ec.components/*'.

### Publishing

1. Run bootstrap task, this will call lerna bootstrap for core/ui/data packages and their prepublish scripts:
```
npm run bootstrap
```
2. Run publish task and select versions:
```
npm run publish
```

To publish a new package, make sure you run ```npm publish --access=public``` before running lerna.
Make sure you update the symlinks.sh and delete-modules.sh scripts to make it work for the demo server.

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
