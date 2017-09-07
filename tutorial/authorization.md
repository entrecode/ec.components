# Authorization Flow

This Tutorial will show how to properly set up authorization with ec.components.
Make sure you have a project running that follows the Setup Tutorial.

## Login

### 1. Create a new Route

Refer to the routes tutorial. We create a route called login with a LoginComponent.

### 2. Inject Sdk to login.component.ts:

```js
import { SdkService } from '@ec.components/data';

/** */
  constructor(public sdk: SdkService) {
  }

  login({email:string,password:string}) {
  this.sdk.login(email,password);
  }
```

### 3. Add Login Component to template

Use this in your login.component.html template:

```html
<ec-login (success)="login($event)"></ec-login>
```

