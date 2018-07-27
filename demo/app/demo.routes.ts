import { Routes } from '@angular/router';
import { LoginFormComponent } from '../../packages/ui/src/utility/login-form/login-form.component';
import { AceDemoComponent } from './ace-demo/ace-demo.component';
import { ApiExplorerComponent } from './api-explorer/api-explorer.component';
import { AssetListDemoComponent } from './asset-list/asset-list.demo.component';
import { AssetSelectDemoComponent } from './asset-select/asset-select-demo.component';
import { AssetDemoComponent } from './asset/asset.demo.component';
import { AuthDemoComponent } from './auth/auth-demo.component';
import { CrudDemoComponent } from './crud/crud-demo.component';
import { DataDemoComponent } from './data/data-demo.component';
import { EntryFormDemoComponent } from './entry-form/entry-form.demo.component';
import { EntryListDemoComponent } from './entry-list/entry-list.demo.component';
import { EntryPopDemoComponent } from './entry-pop-demo/entry-pop-demo.component';
import { EntrySelectDemoComponent } from './entry-select/entry-select-demo.component';
import { FileListDemoComponent } from './file-list/file-list-demo.component';
import { DatetimeDemoComponent } from './form/datetime-demo.component';
import { FormDemoComponent } from './form/form-demo.component';
import { IconDemoComponent } from './icon-demo/icon-demo.component';
import { ListTransformsDemoComponent } from './list-transforms/list-transforms-demo.component';
import { ListDemoComponent } from './list/list-demo.component';
import { LoaderDemoComponent } from './loader-demo/loader-demo.component';
import { LocationPickerDemoComponent } from './location/location-picker-demo.component';
import { MediumEditorDemoComponent } from './medium-editor-demo/medium-editor-demo.component';
import { NotificationsDemoComponent } from './notifications-demo/notifications-demo.component';
import { PaginationDemoComponent } from './pagination/pagination-demo.component';
import { PasswordResetDemoComponent } from './password-reset/password-reset-demo.component';
import { PopDemoComponent } from './pop/pop-demo.component';
import { ResourceCrudDemoComponent } from './resource-crud/resource-crud-demo.component';
import { ResourceDeletePopDemoComponent } from './resource-delete-pop/resource-delete-pop-demo.component';
import { ResourceFormDemoComponent } from './resource-form/resource-form-demo.component';
import { ResourceSelectDemoComponent } from './resource-select/resource-select-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { SignupDemoComponent } from './signup/signup-demo.component';
import { SymbolDemoComponent } from './symbol/symbol-demo.component';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { TinymceDemoComponent } from './tinymce-demo/tinymce-demo.component';
import { VcDemoComponent } from './vc/vc-demo.component';

export const demoRoutes: Routes = [
  {
    path: 'ui',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'form',
      },
      {
        path: 'icons',
        component: IconDemoComponent,
        data: { paths: ['icon-demo/icon-demo.component.html', 'icon-demo/icon-demo.component.ts', 'icon-demo/icon.pipe.ts'] }
      },
      {
        path: 'symbols',
        component: SymbolDemoComponent,
        data: {
          paths: ['symbol/symbol-demo.component.html', 'symbol/symbol-demo.component.ts']
        }
      },
      {
        path: 'list',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list',
          },
          {
            path: 'basic',
            component: ListDemoComponent,
            data: {
              paths: ['list/list-demo.component.ts', 'list/unsplash-image.component.ts']
            }
          },
          {
            path: 'transforms',
            component: ListTransformsDemoComponent,
            data: {
              paths: ['list-transforms/list-transforms-demo.component.ts']
            }
          },
          {
            path: 'pagination',
            component: PaginationDemoComponent,
            data: {
              paths: ['pagination/pagination-demo.component.html', 'pagination/pagination-demo.component.ts']
            }
          }
        ]
      },
      {
        path: 'form',
        component: FormDemoComponent,
        data: {
          paths: ['form/form-demo.component.ts', 'form/form-demo.component.html', 'form/cool-string.component.ts', 'form/cool-string.component.html']
        }
      }, {
        path: 'select',
        component: SelectDemoComponent,
        data: {
          paths: ['select/select-demo.component.html', 'select/select-demo.component.ts']
        }
      },
      {
        path: 'datetime',
        component: DatetimeDemoComponent,
        data: {
          paths: ['form/datetime-demo.component.ts']
        }
      },
      {
        path: 'pop',
        component: PopDemoComponent,
        data: {
          paths: ['pop/pop-demo.component.html', 'pop/pop-demo.component.ts', 'pop/pop-trigger.component.ts', 'pop/pop.markup.html']
        }
      },
      {
        path: 'notifications',
        component: NotificationsDemoComponent,
        data: {
          paths: ['notifications-demo/notifications-demo.component.html', 'notifications-demo/notifications-demo.component.ts']
        }
      },
      {
        path: 'loader',
        component: LoaderDemoComponent,
        data: {
          paths: ['loader-demo/loader-demo.component.html', 'loader-demo/loader-demo.component.ts']
        }
      },
      {
        path: 'tabs',
        component: TabsDemoComponent,
        data: {
          paths: ['tabs/tabs-demo.component.html', 'tabs/tabs-demo.component.ts']
        }
      },
      {
        path: 'login',
        component: LoginFormComponent,
        data: {
          paths: []
        }
      },
    ]
  },
  {
    path: 'resources',
    children: [
      {
        path: 'api-explorer',
        component: ApiExplorerComponent,
        data: {
          paths: ['api-explorer/api-explorer.component.html', 'api-explorer/api-explorer.component.ts']
        }
      },
      {
        path: 'resource-form',
        component: ResourceFormDemoComponent,
        data: {
          paths: ['resource-form/resource-form-demo.component.html', 'resource-form/resource-form-demo.component.ts']
        }
      },
      {
        path: 'resource-crud',
        component: ResourceCrudDemoComponent,
        data: {
          paths: ['resource-crud/resource-crud-demo.component.html', 'resource-crud/resource-crud-demo.component.ts']
        }
      },
      {
        path: 'resource-delete-pop',
        component: ResourceDeletePopDemoComponent,
        data: {
          paths: ['resource-delete-pop/resource-delete-pop-demo.component.html', 'resource-delete-pop/resource-delete-pop-demo.component.ts']
        }
      },
      {
        path: 'resource-select',
        component: ResourceSelectDemoComponent,
        data: {
          paths: ['resource-select/resource-select-demo.component.html', 'resource-select/resource-select-demo.component.ts']
        }
      }
    ]
  },
  {
    path: 'entries',
    children: [
      {
        path: 'entries',
        component: DataDemoComponent,
        data: {
          paths: ['data/data-demo.component.html', 'data/data-demo.component.ts']
        }
      },
      {
        path: 'entry-list',
        component: EntryListDemoComponent,
        data: {
          paths: ['entry-list/entry-list-demo.component.html', 'entry-list/entry-list.demo.component.ts']
        }
      },
      {
        path: 'entry-form',
        component: EntryFormDemoComponent,
        data: {
          paths: ['entry-form/entry-form-demo.component.html', 'entry-form/entry-form.demo.component.ts']
        }
      },
      {
        path: 'entry-pop',
        children: [
          {
            path: '',
            component: EntryPopDemoComponent,
            data: {
              paths: ['entry-pop-demo/entry-pop-demo.component.html', 'entry-pop-demo/entry-pop-demo.component.ts']
            }
          },
          {
            path: 'muffin/:muffinID',
            component: EntryPopDemoComponent,
            data: {
              paths: ['entry-pop-demo/entry-pop-demo.component.html', 'entry-pop-demo/entry-pop-demo.component.ts']
            }
          },
          {
            path: 'muffin/create',
            component: EntryPopDemoComponent,
            data: {
              paths: ['entry-pop-demo/entry-pop-demo.component.html', 'entry-pop-demo/entry-pop-demo.component.ts']
            }
          }
        ]
      },
      {
        path: 'entry-select',
        component: EntrySelectDemoComponent,
        data: {
          paths: ['entry-select/entry-select-demo.component.html', 'entry-select/entry-select-demo.component.ts']
        }
      },
      {
        path: 'crud',
        component: CrudDemoComponent,
        data: {
          paths: ['crud/crud-demo.component.html', 'crud/crud-demo.component.ts']
        }
      },
    ]
  },
  {
    path: 'assets',
    children: [
      {
        path: 'asset',
        component: AssetDemoComponent,
        data: {
          paths: ['asset/asset-demo.component.html', 'asset/asset.demo.component.ts']
        }
      },
      {
        path: 'asset-list',
        component: AssetListDemoComponent,
        data: {
          paths: ['asset-list/asset-list-demo.component.html', 'asset-list/asset-list.demo.component.ts']
        }
      },
      {
        path: 'asset-select',
        component: AssetSelectDemoComponent,
        data: {
          paths: ['asset-select/asset-select-demo.component.html', 'asset-select/asset-select-demo.component.ts']
        }
      },
      {
        path: 'file-list',
        component: FileListDemoComponent,
        data: {
          paths: ['file-list/file-list-demo.component.html', 'file-list/file-list-demo.component.ts']
        }
      },
    ]

  },
  {
    path: 'auth',
    children: [
      /* {
         path: 'login',
         component: PublicLoginComponent
       },
       {
         path: 'signup',
         component: PublicSignupComponent
       },*/
      {
        path: 'auth',
        component: AuthDemoComponent,
        data: {
          paths: ['auth/auth-demo.component.html', 'auth/auth-demo.component.ts']
        }
      },
      {
        path: 'password-reset',
        component: PasswordResetDemoComponent,
        data: {
          paths: ['password-reset/password-reset-demo.component.html', 'password-reset/password-reset-demo.component.ts']
        }
      },
      {
        path: 'signup',
        component: SignupDemoComponent,
        data: {
          paths: ['signup/signup-demo.component.html', 'signup/signup-demo.component.ts']
        }
      },
    ]
  },
  {
    path: 'misc',
    children: [
      {
        path: 'medium-editor',
        component: MediumEditorDemoComponent,
        data: {
          paths: ['medium-editor-demo/medium-editor-demo.component.html', 'medium-editor-demo/medium-editor-demo.component.ts']
        }
      },
      {
        path: 'tinymce',
        component: TinymceDemoComponent,
        data: {
          paths: ['tinymce-demo/tinymce-demo.component.html', 'tinymce-demo/tinymce-demo.component.ts']
        }
      },
      {
        path: 'ace',
        component: AceDemoComponent,
        data: {
          paths: ['ace-demo/ace-demo.component.ts']
        }
      },
      {
        path: 'location',
        component: LocationPickerDemoComponent,
        data: {
          paths: ['location/location-picker-demo.component.html', 'location/location-picker-demo.component.ts']
        }
      }
    ]
  },
  {
    path: 'ec-vc',
    component: VcDemoComponent,
    data: {
      paths: ['vc/vc-demo.component.html', 'vc/vc-demo.component.ts']
    }
  }
];
