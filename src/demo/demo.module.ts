import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { UiModule } from '@ec.components/ui'; //this is how you would import it in reality
// import { DataModule } from '@ec.components/data'; //this is how you would import it in reality
import { LoginComponent, UiModule } from '../packages/ui';
import { DataModule } from '../packages/data';
import { DemoComponent } from './demo.component';
import { VcModule } from '../packages/vc';
import { RouterModule, Routes } from '@angular/router';
import { VcDemoComponent } from './vc/vc-demo.component';
import { PopDemoComponent } from './pop/pop-demo.component';
import { DataDemoComponent } from './data/data-demo.component';
import { ListDemoComponent } from './list/list-demo.component';
import { PaginationDemoComponent } from './pagination/pagination-demo.component';
import { EntryListDemoComponent } from './entry-list/entry-list.demo.component';
import { FormDemoComponent } from './form/form-demo.component';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { EntryFormDemoComponent } from './entry-form/entry-form.demo.component';
import { MockupComponent } from '../packages/ui/mockup/mockup.component';
import { CrudDemoComponent } from './crud/crud-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { PublicLoginComponent } from '../packages/auth/public-login/public-login.component';
import { PublicSignupComponent } from '../packages/auth/public-signup/public-signup.component';
import { AuthModule } from '../packages/auth/auth.module';
import { AuthDemoComponent } from './auth/auth-demo.component';

export const demoRoutes: Routes = [
  {
    path: 'ui',
    children: [{
      path: 'deeply',
      children: [{
        path: 'nested',
        children: [{
          path: 'route',
          children: [{
            path: 'structure',
            redirectTo: '/ui'
          }]
        }]
      }]
    },
      {
        path: 'list',
        component: ListDemoComponent,
        data: {
          title: 'list'
        }
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
        path: 'crud',
        component: CrudDemoComponent
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

@NgModule({
  declarations: [
    DemoComponent,
    VcDemoComponent,
    PopDemoComponent,
    DataDemoComponent,
    ListDemoComponent,
    PaginationDemoComponent,
    EntryListDemoComponent,
    FormDemoComponent,
    TabsDemoComponent,
    EntryFormDemoComponent,
    CrudDemoComponent,
    SelectDemoComponent,
    AuthDemoComponent,
  ],
  imports: [
    CommonModule,
    UiModule,
    DataModule,
    VcModule,
    AuthModule,
    RouterModule.forRoot(demoRoutes)
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class DemoModule {
}
