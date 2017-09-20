## Build/Serve/JIT Problems

--preserve-symlinks fucks up everything

ng build --prod works with es2015 but not with es5
ng serve works with es5 but not with es2015

ng build --prod does NOT work with es5 because components and sdk are shipped as es6 code
    https://github.com/angular/angular-cli/issues/7303
    UglifyJS error due to es6 code in some imported modules

ng serve does NOT work with target: es2015 because JIT compiler does not support es2015
        https://github.com/angular/angular/issues/15325

finished production builds (using target es2015) throw the following error when opened:
    Cannot convert undefined or null to object at Function.getPrototypeOf
    this also comes from the JIT compiler which cannot handle es2015

running non --prod builds work