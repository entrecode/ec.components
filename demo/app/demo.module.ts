import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataModule } from '@ec.components/data';
import { UiModule } from '@ec.components/ui';
import { DemoComponent } from './demo.component';
import { VcModule } from '../../packages/vc/src/vc.module';
import { RouterModule } from '@angular/router';
import { VcDemoComponent } from './vc/vc-demo.component';
import { PopDemoComponent } from './pop/pop-demo.component';
import { DataDemoComponent } from './data/data-demo.component';
import { ListDemoComponent } from './list/list-demo.component';
import { PaginationDemoComponent } from './pagination/pagination-demo.component';
import { EntryListDemoComponent } from './entry-list/entry-list.demo.component';
import { FormDemoComponent } from './form/form-demo.component';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { EntryFormDemoComponent } from './entry-form/entry-form.demo.component';
import { CrudDemoComponent } from './crud/crud-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { AuthDemoComponent } from './auth/auth-demo.component';
import { CoolStringComponent } from './form/cool-string.component'
import { UnsplashImageComponent } from './list/unsplash-image.component';
import { demoRoutes } from './demo.routes'
import { EntrySelectDemoComponent } from './entry-select/entry-select-demo.component';
import { AssetListDemoComponent } from './asset-list/asset-list.demo.component';
import { ListTransformsDemoComponent } from './list-transforms/list-transforms-demo.component';
import { DatamanagerListDemoComponent } from './datamanager-list/datamanager-list.demo.component';
import { ModelListDemoComponent } from './model-list/model-list.demo.component';
import { DatetimeDemoComponent } from './form/datetime-demo.component';
import { DemoDashboardComponent } from './dashboard.component';
import { AssetSelectDemoComponent } from './asset-select/asset-select-demo.component';
import { PopTriggerComponent } from './pop/pop-trigger.component';
import { NotificationsDemoComponent } from './notifications-demo/notifications-demo.component';
import { LoaderDemoComponent } from './loader-demo/loader-demo.component';

demoRoutes.unshift(
  {
    path: '',
    component: DemoDashboardComponent,
    data: { title: 'ec.components' }
  });

@NgModule({
  declarations: [
    DemoDashboardComponent,
    DemoComponent,
    VcDemoComponent,
    PopDemoComponent,
    PopTriggerComponent,
    DataDemoComponent,
    ListDemoComponent,
    ListTransformsDemoComponent,
    PaginationDemoComponent,
    EntryListDemoComponent,
    FormDemoComponent,
    TabsDemoComponent,
    EntryFormDemoComponent,
    EntrySelectDemoComponent,
    AssetSelectDemoComponent,
    CrudDemoComponent,
    SelectDemoComponent,
    AuthDemoComponent,
    CoolStringComponent,
    UnsplashImageComponent,
    AssetListDemoComponent,
    DatamanagerListDemoComponent,
    DatetimeDemoComponent,
    ModelListDemoComponent,
    NotificationsDemoComponent,
    LoaderDemoComponent,
  ],
  entryComponents: [
    CoolStringComponent,
    UnsplashImageComponent,
  ],
  imports: [
    BrowserModule,
    UiModule,
    DataModule,
    VcModule,
    RouterModule.forRoot(demoRoutes)
  ],
  providers: [
    {
      provide: 'useDesktopNotifications',
      useValue: false
    },
    {
      provide: 'environment',
      useValue: {
        datamanagerID: '83cc6374',
        environment: 'stage',
        clientID: 'rest',
      }
    }
  ],
  bootstrap: [DemoComponent]
})
export class DemoModule {
}
