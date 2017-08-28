import { LoginComponent } from '../packages/ui';
import { Routes } from '@angular/router';
import { VcDemoComponent } from './vc/vc-demo.component';
import { PopDemoComponent } from './pop/pop-demo.component';
import { DataDemoComponent } from './data/data-demo.component';
import { ListDemoComponent } from './list/list-demo.component';
import { EntryListDemoComponent } from './entry-list/entry-list.demo.component';
import { FormDemoComponent } from './form/form-demo.component';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { EntryFormDemoComponent } from './entry-form/entry-form.demo.component';
import { MockupComponent } from '../packages/ui/utility/mockup/mockup.component';
import { CrudDemoComponent } from './crud/crud-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { PublicLoginComponent } from '../packages/auth/public-login/public-login.component';
import { PublicSignupComponent } from '../packages/auth/public-signup/public-signup.component';
import { AuthDemoComponent } from './auth/auth-demo.component';
import { EntrySelectDemoComponent } from './entry-select/entry-select-demo.component';
import { AssetListDemoComponent } from './asset-list/asset-list.demo.component';
import { ListTransformsDemoComponent } from './list-transforms/list-transforms-demo.component';
import { DatamanagerListDemoComponent } from './datamanager-list/datamanager-list.demo.component';
import { ModelListDemoComponent } from './model-list/model-list.demo.component';
import { DatetimeDemoComponent } from './form/datetime-demo.component';

export const demoRoutes: Routes = [
  {
    path: 'ui',
    children: [
      {
        path: 'list',
        children: [
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
      {
        path: 'datamanager-list',
        component: DatamanagerListDemoComponent
      },
      {
        path: 'model-list',
        component: ModelListDemoComponent
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
      {
        path: 'login',
        component: PublicLoginComponent
      },
      {
        path: 'signup',
        component: PublicSignupComponent
      },
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
  },
];