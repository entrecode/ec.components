## Setting up a new project with ec.components

This tutorial will show you how to set up a new project with the ec.components.

### 1. Prequisites

Install [angular-cli](https://cli.angular.io/) globally:

```sh
npm install -g @angular/cli
```
The following versions have been used for this tutorial:

- @angular/cli: 1.3.2
- @angular/animations: 4.3.6
- @angular/common: 4.3.6
- @angular/compiler: 4.3.6
- @angular/core: 4.3.6
- @angular/forms: 4.3.6
- @angular/http: 4.3.6
- @angular/platform-browser: 4.3.6
- @angular/platform-browser-dynamic: 4.3.6
- @angular/router: 4.3.6
- @angular/cli: 1.3.2
- @angular/compiler-cli: 4.3.6
- @angular/language-service: 4.3.6
- typescript: 2.4.2

You can lookup your versions with ```ng --version```

### 2. Generate new Project
```sh
ng new ec-project --prefix ec-admin --routing true --style scss
```
Make sure you replace _ec-project_ with your project name and the prefix _ec-admin_ with a project related shorthand symbol.
[More info on the options for new](https://github.com/angular/angular-cli/wiki/new).

### 3. Install @ec.components/data

```sh
cd ec-project
yarn add @ec.components/data --save
yarn add @ec.components/style --save
```

This will install the data package which depends on ui and core packages.
The style package contains styles for ui and data.

### 4. Import Styles

Into your styles.scss, import the following styles:

```
@import "~xlcss/sass/xlcss.scss";
@import "~x.ui/src/_config";
@import "~x.ui/src/x.ui-sandbox.scss";
@import "~@ec.components/style/components.scss";
```

### 5. Setup environment

In src/environments, you can find the different environment files.
By Default, there is a dev and a prod environment. For this tutorial, those two should be enough. We will use the dev environment for dev and staging and the prod environment for live. You could also add more environments, for more information, [look here](https://github.com/angular/angular-cli/wiki/stories-application-environments). 

_src/environments/environment.ts_:

```js
export const environment = {
  production: false,
  environment: 'stage', // https://entrecode.github.io/ec.sdk/#environment
  datamanagerID: 'XXXXXXXX', // datamanager shortID
  clientID: 'my-dev-client' // your clientID
};
```

_src/environments/environment.prod.ts_:

```js
export const environment = {
  production: true,
  environment: 'live', // https://entrecode.github.io/ec.sdk/#environment
  datamanagerID: 'XXXXXXXX', // datamanager shortID
  clientID: 'my-live-client' // your clientID
};
```
The .prod environment will be used when running ng build for production.
The client should use token method body. The callback URL does not matter.

### 6. Add DataModule

Go to src/app/app.module and add DataModule to your imports:

```js
import { DataModule } from '@ec.components/data';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataModule.forEnvironment(environment),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
Here we are importing the DataModule along with the environment to then import it into our AppModule with the forEnvironment method.

### 7. Add --ssl flag

in your package.json, edit your start script to look like this:

```
"start": "ng serve --ssl",
```

Without the --ssl flag, the authorization won't work, because it enforces https.

### 8. Add a component

e.g. add to _src/app/app.component.html_:

```html
<ec-crud model="muffin"></ec-crud>
```

This assumes that the model _muffin_ exists inside the datamanager provided through your environment.


### 9. Run the fun

Thats it! Now you can run the app using:

```sh
npm run start
```


now navigate to https://localhost:4200

### 10. Add Notifications

To your app.component, you can add a global notification component, outside of your routing:

```html
<ec-notifications></ec-notifications>
```

This will display all messages sent by the components or your own modules.