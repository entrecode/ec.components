import { LoginComponent } from '../../packages/ui/src/utility/login/login.component';
import { Routes } from '@angular/router';
import { PopDemoComponent } from './pop/pop-demo.component';
import { DataDemoComponent } from './data/data-demo.component';
import { ListDemoComponent } from './list/list-demo.component';
import { EntryListDemoComponent } from './entry-list/entry-list.demo.component';
import { FormDemoComponent } from './form/form-demo.component';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { EntryFormDemoComponent } from './entry-form/entry-form.demo.component';
import { MockupComponent } from '../../packages/ui/src/utility/mockup/mockup.component';
import { CrudDemoComponent } from './crud/crud-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { EntrySelectDemoComponent } from './entry-select/entry-select-demo.component';
import { ListTransformsDemoComponent } from './list-transforms/list-transforms-demo.component';
import { DatamanagerListDemoComponent } from './datamanager-list/datamanager-list.demo.component';
import { ModelListDemoComponent } from './model-list/model-list.demo.component';
import { DatetimeDemoComponent } from './form/datetime-demo.component';
import { AssetListDemoComponent } from './asset-list/asset-list.demo.component';
// import { PublicLoginComponent } from '@ec.components/data';
import { AuthDemoComponent } from './auth/auth-demo.component';
import { VcDemoComponent } from './vc/vc-demo.component';
import { CrudComponent } from '../../packages/data/src/crud/crud.component';
import { AssetSelectDemoComponent } from './asset-select/asset-select-demo.component';
import { NotificationsDemoComponent } from './notifications-demo/notifications-demo.component';
import { LoaderDemoComponent } from './loader-demo/loader-demo.component';

export const demoRoutes: Routes = [
  /*  {
      path: 'ec',
      loadChildren: () => DataModule,
    },*/
  {
    path: 'ui',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'form',
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
        component: LoginComponent
      },
      {
        path: 'mockups',
        component: MockupComponent
      },
    ]
  },
  {
    path: 'data',
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
        path: 'entry-select',
        component: EntrySelectDemoComponent
      },
      {
        path: 'crud',
        component: CrudDemoComponent
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
    path: 'editor',
    children: [
      {
        path: 'data',
        component: DatamanagerListDemoComponent,
      },
      {
        path: 'data/:datamanagerID',
        component: ModelListDemoComponent
      },
      {
        path: 'data/:datamanagerID/:model',
        component: CrudComponent,
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
    ]
  },
  {
    path: 'ec-vc',
    component: VcDemoComponent
  }
];
