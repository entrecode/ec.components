# Adding a new package

To add a new package to @ec.components, follow this guide!

## 1. Create folder in packages

Create a new folder, e.g. ```mkdir packages/medium-editor```

## 2. init npm

```cd packages/medium-editor && npm init```

- Make sure to name the package scoped: ```@ec.components/*```
- Add dependencies according to your needs, e.g. angular etc.

## 3. Create src folder

Create a src folder and add your super cool typescript code.
- Make sure your package.json main file is correct.
- Make sure you have all dependencies up to date.

## 4. add package to symlinks.sh

- Add your package name to the symlinks script.

## 5. add package to delete-modules.sh script

- Add your package name to the delete-modules script.

## 6. add package to main package.json dependencies

- Keep version up to date (or use * as wildcard)
- run ```npm i```

## 7. add package to lerna.json

- This integrates the package to the bootstrap/publish cycle of lerna.

## 8. Manually Publish package the first time

Before being able to publish with lerna, you have to publish it manually the first time:

```sh
npm publish --access=public
```

see https://docs.npmjs.com/cli/access#details.

## 9. Add Demo