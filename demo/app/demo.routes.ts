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
            path: 'list',
            component: ListDemoComponent,
            data: {
              title: 'basic'
            }
          },
          {
            path: 'list-transforms',
            component: ListTransformsDemoComponent,
            data: {
              title: 'transforms'
            }
          },]
      },
      {
        path: 'form',
        component: FormDemoComponent,
        data: {
          title: 'form'
        }
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'pop',
        component: PopDemoComponent,
        data: {
          title: 'ec-pop'
        }
      },
      {
        path: 'tabs',
        component: TabsDemoComponent,
        data: {
          title: 'tabs'
        }
      },
      {
        path: 'select',
        component: SelectDemoComponent,
      },
      {
        path: 'mockups',
        component: MockupComponent,
        data: {
          title: 'Mockups'
        }
      },
      {
        path: 'datetime',
        component: DatetimeDemoComponent
      },
    ]
  },
  {
    path: 'data',
    children: [
      {
        path: 'entries',
        component: DataDemoComponent,
        data: {
          title: 'entries'
        }
      },
      {
        path: 'entry-list',
        component: EntryListDemoComponent,
        data: {
          title: 'entry-list'
        }
      },
      {
        path: 'entry-form',
        component: EntryFormDemoComponent,
        data: {
          title: 'entry-form'
        }
      },
      {
        path: 'entry-select',
        component: EntrySelectDemoComponent,
        data: {
          title: 'entry-select'
        }
      },
      {
        path: 'crud',
        component: CrudDemoComponent
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
    path: 'files',
    children: [
      {
        path: 'asset-list',
        component: AssetListDemoComponent
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
    path: 'vc',
    component: VcDemoComponent,
    data: {
      title: 'ec-vc'
    }
  }
];