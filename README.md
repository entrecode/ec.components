# ec.components

This project contains all sorts of angular components for creating data driven applications.
It is mainly used for entrecode admin applications in combination with the [entrecode](https://doc.entrecode.de) using [ec.sdk](https://github.com/entrecode/ec.sdk).

## Packages

## Main Packages

- [@ec.components/core](https://entrecode.github.io/ec.components/additional-documentation/readme/core-readme.html): contains core typescript classes (no angular/datamanager)
- [@ec.components/ui](https://entrecode.github.io/ec.components/additional-documentation/readme/ui-readme.html): contains core ui components (not datamanager specific)
- [@ec.components/data](https://entrecode.github.io/ec.components/additional-documentation/readme/data-readme.html): contains ui components for [datamanager](https://doc.entrecode.de).
- [@ec.components/style](https://entrecode.github.io/ec.components/additional-documentation/readme/style-readme.html): contains styles for all components, built on [x.ui](https://entrecode.github.io/x.ui/).

The dependencies stack up from core to data (data > ui > core). You could also omit data, using just the ui components.

## Optional Packages

- [@ec.components/calendar](https://entrecode.github.io/ec.components/additional-documentation/readme/calendar-readme.html): contains calendar components, uses [moment](https://github.com/moment/moment).
- [@ec.components/location](https://entrecode.github.io/ec.components/additional-documentation/readme/location-readme.html): wraps [angular-google-maps](https://github.com/SebastianM/angular-google-maps).
- [@ec.components/tinymce](https://entrecode.github.io/ec.components/additional-documentation/readme/tinymce-readme.html): wraps [tinymce wysiwyg editor](https://github.com/tinymce/tinymce).
- [@ec.components/medium-editor](https://entrecode.github.io/ec.components/additional-documentation/readme/medium-editor-readme.html): wraps [medium wysiwyg editor](https://github.com/yabwe/medium-editor).
- [@ec.components/ace](https://entrecode.github.io/ec.components/additional-documentation/readme/ace-readme.html): wraps [ace code editor](https://github.com/ajaxorg/ace).

## Documentation

The main documentation is located at [entrecode.github.io/ec.components](https://entrecode.github.io/ec.components/). You can find a getting started guide there.

## Demo

A Demo is available at [components.entrecode.de](https://components.entrecode.de).

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

### Releasing

Run release task and select versions:

```sh
npm run release
```

To publish a new package for the first time, make sure you run ```npm publish --access=public``` before running lerna. See add-new-package for more info on creating a new package.

Also make sure to use [Conventional Commits](https://www.conventionalcommits.org) for proper changelogging.

[Impressum & Datenschutz](https://entrecode.de/datenschutz)
