import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { UiModule } from '@ec.components/ui'; //this is how you would import it in reality
// import { DataModule } from '@ec.components/data'; //this is how you would import it in reality
import { UiModule } from '../packages/ui';
import { DataModule } from '../packages/data';
import { DemoComponent } from './demo.component';
import { VcModule } from '../packages/vc';
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
import { AuthModule } from '../packages/auth/auth.module';
import { AuthDemoComponent } from './auth/auth-demo.component';
import { CoolStringComponent } from './form/cool-string.component'
import { UnsplashImageComponent } from './list/unsplash-image.component';
import { demoRoutes } from './demo.routes'
import { EntrySelectDemoComponent } from './entry-select/entry-select-demo.component';
import { FilesModule } from '../packages/data/files/files.module';
import { AssetListDemoComponent } from './asset-list/asset-list.demo.component';
import { AssetInputComponent } from '../packages/data/files/asset-input/asset-input.component';
import { ListTransformsDemoComponent } from './list-transforms/list-transforms-demo.component';
import { DatamanagerListDemoComponent } from './datamanager-list/datamanager-list.demo.component';
import { ModelListDemoComponent } from './model-list/model-list.demo.component';
import { DatetimeDemoComponent } from './form/datetime-demo.component';
import { DemoDashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DemoDashboardComponent,
    DemoComponent,
    VcDemoComponent,
    PopDemoComponent,
    DataDemoComponent,
    ListDemoComponent,
    ListTransformsDemoComponent,
    PaginationDemoComponent,
    EntryListDemoComponent,
    FormDemoComponent,
    TabsDemoComponent,
    EntryFormDemoComponent,
    EntrySelectDemoComponent,
    CrudDemoComponent,
    SelectDemoComponent,
    AuthDemoComponent,
    CoolStringComponent,
    UnsplashImageComponent,
    AssetListDemoComponent,
    DatamanagerListDemoComponent,
    DatetimeDemoComponent,
    ModelListDemoComponent,
  ],
  entryComponents: [
    CoolStringComponent,
    UnsplashImageComponent,
    AssetInputComponent,
  ],
  imports: [
    CommonModule,
    UiModule,
    DataModule,
    FilesModule,
    VcModule,
    AuthModule,
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
