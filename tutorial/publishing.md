# Publishing the components

## 0. Before Publishing
- Update the package.json to the new version.
- Test the demo
- Run docs and test tasks

## 1. Bootstrap (runs lerna bootstrap)
```
npm run bootstrap
```

## 2. Publish (runs lerna publish)
Before running this command, make sure you are npm logged in with the entrecode npm account.

```
npm run publish
```

Now select the newest versions

## 3. Merge Master

- In the ec.components repo, switch to the master branch.
- Merge the Publish commit with the new version into the master