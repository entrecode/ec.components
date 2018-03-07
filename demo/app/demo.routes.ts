import { ResourceSelectDemoComponent } from './resource-select/resource-select-demo.component';
import { DemoDashboardComponent } from './dashboard.component';
import { Routes } from '@angular/router';
import { PopDemoComponent } from './pop/pop-demo.component';
import { DataDemoComponent } from './data/data-demo.component';
import { ListDemoComponent } from './list/list-demo.component';
import { EntryListDemoComponent } from './entry-list/entry-list.demo.component';
import { FormDemoComponent } from './form/form-demo.component';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { EntryFormDemoComponent } from './entry-form/entry-form.demo.component';
import { CrudDemoComponent } from './crud/crud-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { EntrySelectDemoComponent } from './entry-select/entry-select-demo.component';
import { ListTransformsDemoComponent } from './list-transforms/list-transforms-demo.component';
import { DatetimeDemoComponent } from './form/datetime-demo.component';
import { AssetListDemoComponent } from './asset-list/asset-list.demo.component';
import { AssetDemoComponent } from './asset/asset.demo.component';
import { AuthDemoComponent } from './auth/auth-demo.component';
import { VcDemoComponent } from './vc/vc-demo.component';
import { CrudComponent } from '../../packages/data/src/crud/crud.component';
import { AssetSelectDemoComponent } from './asset-select/asset-select-demo.component';
import { NotificationsDemoComponent } from './notifications-demo/notifications-demo.component';
import { LoaderDemoComponent } from './loader-demo/loader-demo.component';
import { MediumEditorDemoComponent } from './medium-editor-demo/medium-editor-demo.component';
import { LoginFormComponent } from '../../packages/ui/src/utility/login-form/login-form.component';
import { EntryPopDemoComponent } from './entry-pop-demo/entry-pop-demo.component';
import { TinymceDemoComponent } from './tinymce-demo/tinymce-demo.component';
import { AceDemoComponent } from './ace-demo/ace-demo.component';
import { ActionbarDemoComponent } from './actionbar-demo/actionbar-demo.component';
import { IconDemoComponent } from './icon-demo/icon-demo.component';
import { PaginationDemoComponent } from './pagination/pagination-demo.component';
import { ResourceFormDemoComponent } from './resource-form/resource-form-demo.component';
import { ResourceCrudDemoComponent } from './resource-crud/resource-crud-demo.component';
import { PasswordResetDemoComponent } from './password-reset/password-reset-demo.component';
import { ApiExplorerComponent } from './api-explorer/api-explorer.component';
import { SymbolDemoComponent } from './symbol/symbol-demo.component';
import { ResourceDeletePopDemoComponent } from './resource-delete-pop/resource-delete-pop-demo.component';

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
      },
      {
        path: 'symbols',
        component: SymbolDemoComponent,
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
            component: ListDemoComponent
          },
          {
            path: 'transforms',
            component: ListTransformsDemoComponent
          },
          {
            path: 'pagination',
            component: PaginationDemoComponent
          }
        ]
      },
      {
        path: 'form',
        component: FormDemoComponent
      }, {
        path: 'select',
        component: SelectDemoComponent,
      },
      {
        path: 'datetime',
        component: DatetimeDemoComponent
      },
      {
        path: 'pop',
        component: PopDemoComponent
      },
      {
        path: 'notifications',
        component: NotificationsDemoComponent
      },
      {
        path: 'loader',
        component: LoaderDemoComponent
      },
      {
        path: 'tabs',
        component: TabsDemoComponent
      },
      {
        path: 'login',
        component: LoginFormComponent
      },
      {
        path: 'actionbar',
        component: ActionbarDemoComponent,
      },
    ]
  },
  {
    path: 'resources',
    children: [
      {
        path: 'api-explorer',
        component: ApiExplorerComponent
      },
      {
        path: 'resource-form',
        component: ResourceFormDemoComponent
      },
      {
        path: 'resource-crud',
        component: ResourceCrudDemoComponent
      },
      {
        path: 'resource-delete-pop',
        component: ResourceDeletePopDemoComponent
      },
      {
        path: 'resource-select',
        component: ResourceSelectDemoComponent
      }
    ]
  },
  {
    path: 'entries',
    children: [
      {
        path: 'entries',
        component: DataDemoComponent
      },
      {
        path: 'entry-list',
        component: EntryListDemoComponent
      },
      {
        path: 'entry-form',
        component: EntryFormDemoComponent
      },
      {
        path: 'entry-pop',
        children: [
          {
            path: '',
            component: EntryPopDemoComponent
          },
          {
            path: 'muffin/:muffinID',
            component: EntryPopDemoComponent
          },
          {
            path: 'muffin/create',
            component: EntryPopDemoComponent
          }
        ]
      },
      {
        path: 'entry-select',
        component: EntrySelectDemoComponent
      },
      {
        path: 'crud',
        component: CrudDemoComponent
      },
    ]
  },
  {
    path: 'assets',
    children: [
      {
        path: 'asset',
        component: AssetDemoComponent
      },
      {
        path: 'asset-list',
        component: AssetListDemoComponent
      },
      {
        path: 'asset-select',
        component: AssetSelectDemoComponent
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
        component: AuthDemoComponent
      },
      {
        path: 'password-reset',
        component: PasswordResetDemoComponent
      },
    ]
  },
  {
    path: 'misc',
    children: [
      {
        path: 'medium-editor',
        component: MediumEditorDemoComponent
      },
      {
        path: 'tinymce',
        component: TinymceDemoComponent
      },
      {
        path: 'ace',
        component: AceDemoComponent
      }
    ]
  },
  {
    path: 'ec-vc',
    component: VcDemoComponent
  }
];
