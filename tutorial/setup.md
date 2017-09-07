## Setting up a new project with ec.components

This tutorial will show you how to set up a new project with the ec.components.

### 1. Prequisites

Install [angular-cli](https://cli.angular.io/) globally:

```sh
npm install -g @angular/cli
```
The following versions have been used for this tutorial:

- @angular/cli: 1.3.2
- node: 7.9.0
- os: darwin x64
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

You can lookup your versions with ```ng --version```

### 2. Generate new Project
```
ng new --prefix ec --routing true --style scss
```

[More info on the options for new](https://github.com/angular/angular-cli/wiki/new)

