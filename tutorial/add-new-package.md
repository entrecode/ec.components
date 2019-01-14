
# Adding a new Package in 10 easy steps

The following steps need to be done to generate a new library that is standards compliant.
Just replace the example name "data" with the new package name.

## 1. Run CLI command to generate a new library

```sh
ng generate library data -p ec
```

This will create a new folder under packages/ (see newProjectRoot in angular.json).

## 2. Prefix packages/data/package.json#name with @ec.components

also make sure the version is correct

## 3. Prefix root tsconfig.json paths "data" and "data/*" with @ec.components

## 4. Move src files to packages/data/lib

## 5. add dependencies (e.g. ec.sdk) to both root and lib package.json

## 6. add whitelistedNonPeerDependencies to ng-package.json

```json
  "whitelistedNonPeerDependencies": [
    "."
  ]
```

## 7. fix relative imports

```ts
import { Notification } from '../../../../ui/src/notifications/notification';
import { WithNotifications } from '../../../../ui/src/notifications/with-notifications.interface';
// replace with
import { WithNotifications, Notification } from '@ec.components/ui';
```

## 8. fix rxjs imports

```ts
import { Subject } from 'rxjs/Subject';
// to
import { Subject } from 'rxjs';
```

## 9. fix other lint errors like semicolon stuff

## build it

```sh
ng build data
```

## run yarn to link dist/data to node_modules

## 10. add dependency to root package.json
