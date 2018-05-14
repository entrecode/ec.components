import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DataModule } from '@ec.components/data';
import { UiModule } from '@ec.components/ui';
import { AceModule } from '../../packages/ace/index';
/* import { LocationModule } from '../../packages/location/src/location.module'; */
import { MediumModule } from '../../packages/medium-editor/src/medium.module';
import { TinymceModule } from '../../packages/tinymce/src/tinymce.module';
import { VcModule } from '../../packages/vc/src/vc.module';
import { AceDemoComponent } from './ace-demo/ace-demo.component';
import { ApiExplorerComponent } from './api-explorer/api-explorer.component';
import { AssetListDemoComponent } from './asset-list/asset-list.demo.component';
import { AssetSelectDemoComponent } from './asset-select/asset-select-demo.component';
import { AssetDemoComponent } from './asset/asset.demo.component';
import { AuthDemoComponent } from './auth/auth-demo.component';
import { CrudDemoComponent } from './crud/crud-demo.component';
import { DemoDashboardComponent } from './dashboard.component';
import { DataDemoComponent } from './data/data-demo.component';
import { DemoComponent } from './demo.component';
import { demoRoutes } from './demo.routes';
import { EntryFormDemoComponent } from './entry-form/entry-form.demo.component';
import { EntryListDemoComponent } from './entry-list/entry-list.demo.component';
import { EntryPopDemoComponent } from './entry-pop-demo/entry-pop-demo.component';
import { EntrySelectDemoComponent } from './entry-select/entry-select-demo.component';
import { FileListDemoComponent } from './file-list/file-list-demo.component';
import { CoolStringComponent } from './form/cool-string.component';
import { DatetimeDemoComponent } from './form/datetime-demo.component';
import { FormDemoComponent } from './form/form-demo.component';
import { IconDemoComponent } from './icon-demo/icon-demo.component';
import { IconPipe } from './icon-demo/icon.pipe';
import { ListTransformsDemoComponent } from './list-transforms/list-transforms-demo.component';
import { ListDemoComponent } from './list/list-demo.component';
import { UnsplashImageComponent } from './list/unsplash-image.component';
import { LoaderDemoComponent } from './loader-demo/loader-demo.component';
import { LocationPickerDemoComponent } from './location/location-picker-demo.component';
import { MediumEditorDemoComponent } from './medium-editor-demo/medium-editor-demo.component';
import { NotificationsDemoComponent } from './notifications-demo/notifications-demo.component';
import { PaginationDemoComponent } from './pagination/pagination-demo.component';
import { PasswordResetDemoComponent } from './password-reset/password-reset-demo.component';
import { PopDemoComponent } from './pop/pop-demo.component';
import { PopTriggerComponent } from './pop/pop-trigger.component';
import { ResourceCrudDemoComponent } from './resource-crud/resource-crud-demo.component';
import { ResourceDeletePopDemoComponent } from './resource-delete-pop/resource-delete-pop-demo.component';
import { ResourceFormDemoComponent } from './resource-form/resource-form-demo.component';
import { ResourceSelectDemoComponent } from './resource-select/resource-select-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { SymbolDemoComponent } from './symbol/symbol-demo.component';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { TinymceDemoComponent } from './tinymce-demo/tinymce-demo.component';
import { VcDemoComponent } from './vc/vc-demo.component';

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
    ApiExplorerComponent,
    ResourceFormDemoComponent,
    ResourceCrudDemoComponent,
    FormDemoComponent,
    TabsDemoComponent,
    EntryFormDemoComponent,
    EntryPopDemoComponent,
    EntrySelectDemoComponent,
    AssetSelectDemoComponent,
    CrudDemoComponent,
    SelectDemoComponent,
    AuthDemoComponent,
    PasswordResetDemoComponent,
    CoolStringComponent,
    UnsplashImageComponent,
    AssetListDemoComponent,
    AssetDemoComponent,
    DatetimeDemoComponent,
    NotificationsDemoComponent,
    LoaderDemoComponent,
    MediumEditorDemoComponent,
    TinymceDemoComponent,
    AceDemoComponent,
    IconDemoComponent,
    IconPipe,
    SymbolDemoComponent,
    ResourceDeletePopDemoComponent,
    ResourceSelectDemoComponent,
    FileListDemoComponent,
    LocationPickerDemoComponent
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
    RouterModule.forRoot(demoRoutes),
    MediumModule,
    TinymceModule,
    AceModule,
/*     LocationModule */
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
