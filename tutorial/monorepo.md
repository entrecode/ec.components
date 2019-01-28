## Dev Notes: Approaches to build a monorepo

### 1. Using workspaces with src folder

This approach will symlink the package folders directly. When doing so, lerna will be able to tell the changed packages. A problem will be the correct importing of built/non-built files.

lerna.json

```json
{
  "version": "independent",
  "useWorkspaces": true,
  "npmClient": "yarn"
}
```

package.json

```json
"workspaces": [
  "packages/*"
],
```

To ensure correct module resolving, we set the each packages main file to its public_api.ts:

```json
{
  "name": "@ec.components/calendar",
  "main": "src/public_api.ts",
}
```

when running ```ng build calendar```, the package.json will be copied to dist/package.json with the main field replaced by ```bundles/ec.components-calendar.umd.js```.

PROBLEM:

as soon as building a package that depends on another package, like ui, the compiler complains:

```sh
error TS6059: File '/Users/felix/entrecode/ec.components/packages/calendar/src/lib/calendar.module.ts' is not under 'rootDir' '/Users/felix/entrecode/ec.components/packages/ui/src'. 'rootDir' is expected to contain all source files.
```

ngc (which wraps tsc) hits the source files of the calendar module.
See https://github.com/ng-packagr/ng-packagr/issues/987.


### 2. Using different folders for lerna/workspaces

Use dist for symlinking:

```json
  "workspaces": [
    "packages/*/dist"
  ],
```

Build calendar (which has no internal dependencies) first:

```ng build calendar```

create symlink of calendar dist folder to @ec.components/calendar:

```sh
cd node_modules
mkdir @ec.components && cd \@ec.components
ln -s ../../packages/calendar/dist calendar
```

This process can be automated by a script:

symlink-package.sh

```sh
cd node_modules/\@ec.components
ln -s ../../packages/$1/dist $1
```

build-package.hs:

```sh
ng build $1
sh scripts/symlink-package.sh $1
```

```sh
sh scripts/build-package.sh ui
```

In lerna.json, we add the root package folders (as opposed to dist folders in package.json):

```json
{
  "version": "independent",
  "useWorkspaces": false,
  "npmClient": "yarn",
  "packages": [
    "packages/ace",
    "packages/calendar",
    "packages/core",
    "packages/data",
    "packages/location",
    "packages/medium-editor",
    "packages/tinymce",
    "packages/ui"
  ]
}
```

Note that it only works when settings useWorkspaces to false!
