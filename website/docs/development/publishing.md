---
id: publishing
title: Publishing packages
sidebar_label: Publishing
---

## 1. Run publish task and select versions:

```sh
npm run publish
```

To publish a new package for the first time, make sure you run ```npm publish --access=public``` before running lerna. See add-new-package for more info on creating a new package.

## 2. Merge Master

- In the ec.components repo, switch to the master branch.
- Merge the Publish commit with the new version into the master