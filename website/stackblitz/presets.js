export const stackblitzPresets = {
  angular: {
    project: {
      template: 'angular',
    },
  },
  'ec.components': {
    project: {
      // template: 'angular',
      template: 'typescript',
      dependencies: {
        '@angular/common': '7.2.2',
        '@angular/compiler': '7.2.2',
        '@angular/core': '7.2.2',
        '@angular/forms': '7.2.2',
        '@angular/platform-browser': '7.2.2',
        '@angular/platform-browser-dynamic': '7.2.2',
        '@angular/router': '7.2.2',
        /* '@ec.components/style': '0.21.2',
      '@ec.components/ui': '0.36.11', */
        'core-js': '2.6.3',
        rxjs: '6.3.3',
        'zone.js': '0.8.29',
      },
      files: {
        'index.html': `<my-app>loading</my-app>`,
        'app/app.module.ts': `import { NgModule } from '@angular/core';
        import { BrowserModule } from '@angular/platform-browser';
        import { FormsModule } from '@angular/forms';
        
        import { AppComponent } from './app.component';
        import { HelloComponent } from './hello.component';
        
        @NgModule({
          imports:      [ BrowserModule, FormsModule ],
          declarations: [ AppComponent, HelloComponent ],
          bootstrap:    [ AppComponent ]
        })
        export class AppModule { }`,
        'app/hello.component.ts': `import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: '<h1>Hello {{name}}!</h1>',
})
export class HelloComponent  {
  @Input() name: string;
}
`,
        'app/app.component.html': `<hello name="{{ name }}"></hello>
        <p>
          Start editing to see some magic happen :)
        </p>`,
        'app/app.component.ts': `import { Component } from '@angular/core';

        @Component({
          selector: 'my-app',
          templateUrl: './app.component.html',
          styleUrls: [ './app.component.css' ]
        })
        export class AppComponent  {
          name = 'Angular';
        }`,
        'main.ts': `
        import './polyfills';

        import { enableProdMode } from '@angular/core';
        import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
        
        import { AppModule } from './app/app.module';
        
        platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
          // Ensure Angular destroys itself on hot reloads.
          if (window['ngRef']) {
            window['ngRef'].destroy();
          }
          window['ngRef'] = ref;
        
          // Otherwise, log the boot error
        }).catch(err => console.error(err));
`,
        'polyfills.ts': `
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone'; 
`,
        'angular.json': `
        {
          "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
          "version": 1,
          "newProjectRoot": "projects",
          "projects": {
            "demo": {
              "root": "",
              "sourceRoot": "src",
              "projectType": "application",
              "prefix": "app",
              "schematics": {},
              "architect": {
                "build": {
                  "builder": "@angular-devkit/build-angular:browser",
                  "options": {
                    "outputPath": "dist/demo",
                    "index": "src/index.html",
                    "main": "src/main.ts",
                    "polyfills": "src/polyfills.ts",
                    "tsConfig": "src/tsconfig.app.json",
                    "assets": [
                      "src/favicon.ico",
                      "src/assets"
                    ],
                    "styles": [
                      "src/styles.css"
                    ],
                    "scripts": []
                  },
                  "configurations": {
                    "production": {
                      "fileReplacements": [
                        {
                          "replace": "src/environments/environment.ts",
                          "with": "src/environments/environment.prod.ts"
                        }
                      ],
                      "optimization": true,
                      "outputHashing": "all",
                      "sourceMap": false,
                      "extractCss": true,
                      "namedChunks": false,
                      "aot": true,
                      "extractLicenses": true,
                      "vendorChunk": false,
                      "buildOptimizer": true
                    }
                  }
                },
                "serve": {
                  "builder": "@angular-devkit/build-angular:dev-server",
                  "options": {
                    "browserTarget": "demo:build"
                  },
                  "configurations": {
                    "production": {
                      "browserTarget": "demo:build:production"
                    }
                  }
                },
                "extract-i18n": {
                  "builder": "@angular-devkit/build-angular:extract-i18n",
                  "options": {
                    "browserTarget": "demo:build"
                  }
                },
                "test": {
                  "builder": "@angular-devkit/build-angular:karma",
                  "options": {
                    "main": "src/test.ts",
                    "polyfills": "src/polyfills.ts",
                    "tsConfig": "src/tsconfig.spec.json",
                    "karmaConfig": "src/karma.conf.js",
                    "styles": [
                      "styles.css"
                    ],
                    "scripts": [],
                    "assets": [
                      "src/favicon.ico",
                      "src/assets"
                    ]
                  }
                },
                "lint": {
                  "builder": "@angular-devkit/build-angular:tslint",
                  "options": {
                    "tsConfig": [
                      "src/tsconfig.app.json",
                      "src/tsconfig.spec.json"
                    ],
                    "exclude": [
                      "**/node_modules/**"
                    ]
                  }
                }
              }
            }
          },
          "defaultProject": "demo"
        }

`,
      },
    },
    options: { openFile: 'app/app.component.ts' },
  },
};
