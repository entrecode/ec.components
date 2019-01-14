# ec.components

This project contains all sorts of angular components for creating data driven applications.
It is mainly used for entrecode admin applications in combination with the [entrecode](https://doc.entrecode.de) using [ec.sdk](https://github.com/entrecode/ec.sdk).

## Packages

## Main Packages

- *@ec.components/core*: contains core typescript classes (no angular/datamanager)
- *@ec.components/ui*: contains core ui components (not datamanager specific)
- *@ec.components/data*: contains ui components for [datamanager](https://doc.entrecode.de).
- *@ec.components/style*: contains styles for all components, built on [x.ui](https://entrecode.github.io/x.ui/).

The dependencies stack up from core to data (data > ui > core). You could also omit data, using just the ui components.

## Optional Packages

- *@ec.components/calendar*: contains calendar components, uses [moment](https://github.com/moment/moment).
- *@ec.components/location*: wraps [angular-google-maps](https://github.com/SebastianM/angular-google-maps).
- *@ec.components/tinymce*: wraps [tinymce wysiwyg editor](https://github.com/tinymce/tinymce).
- *@ec.components/medium-editor*: wraps [medium wysiwyg editor](https://github.com/yabwe/medium-editor).
- *@ec.components/ace*: wraps [ace code editor](https://github.com/ajaxorg/ace).

## Documentation

The main documentation is located at [entrecode.github.io/ec.components](https://entrecode.github.io/ec.components/). You can find a getting started guide there.

## Demo

A Demo is available at [components.entrecode.de](https://components.entrecode.de).

## Developing with Lerna + Yarn Workspaces

The repository is a monorepo, managed by [lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).
All folders inside dist + packages/style will be used as symlinks in node_modules/@ec.components/*.
You can update the symlinks by running yarn (e.g. after adding a new package).

### Publishing

Run publish task and select versions:

```sh
npm run publish
```

To publish a new package, make sure you run ```npm publish --access=public``` before running lerna.
Make sure you update the symlinks.sh and delete-modules.sh scripts to make it work for the demo server.

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
