import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AceModule } from '@ec.components/ace';
import { CalendarModule } from '@ec.components/calendar';
import { DataModule } from '@ec.components/data';
import { LocationModule } from '@ec.components/location';
import { MediumEditorModule } from '@ec.components/medium-editor';
import { TinymceModule } from '@ec.components/tinymce';
import { UiModule } from '@ec.components/ui';
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
import { DoclinksComponent } from './doclinks/doclinks.component';
import { EntryFormDemoComponent } from './entry-form/entry-form.demo.component';
import { EntryListSelectDemoComponent } from './entry-list-select/entry-list-select-demo.component';
import { EntryListDemoComponent } from './entry-list/entry-list.demo.component';
import { EntryPopDemoComponent } from './entry-pop-demo/entry-pop-demo.component';
import { EntrySelectDemoComponent } from './entry-select/entry-select-demo.component';
import { FileListDemoComponent } from './file-list/file-list-demo.component';
import { CoolStringComponent } from './form/cool-string.component';
/* import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import en from '@ec.components/ui/src/symbol/en'; */
import { CounterComponent } from './form/counter.component';
import { DatetimeDemoComponent } from './form/datetime-demo.component';
import { FormDemoComponent } from './form/form-demo.component';
import { GithubSourceComponent } from './github-source/github-source.component';
import { GithubSourcesComponent } from './github-source/github-sources.component';
import { IconDemoComponent } from './icon-demo/icon-demo.component';
import { IconPipe } from './icon-demo/icon.pipe';
import { ImageSelectPopDemoComponent } from './image-select-pop-demo/image-select-pop-demo.component';
import { KeycommandsDemoComponent } from './keycommands/keycommands-demo.component';
import { ListTransformsDemoComponent } from './list-transforms/list-transforms-demo.component';
import { ListDemoComponent } from './list/list-demo.component';
import { UnsplashImageComponent } from './list/unsplash-image.component';
import { LoaderDemoComponent } from './loader-demo/loader-demo.component';
import { LocationPickerDemoComponent } from './location/location-picker-demo.component';
import { LoginDemoComponent } from './login-demo/login-demo.component';
import { MediumEditorDemoComponent } from './medium-editor-demo/medium-editor-demo.component';
import { MenuComponent } from './menu/menu.component';
import { ModalDemoComponent } from './modal/modal-demo.component';
import { NotificationsDemoComponent } from './notifications-demo/notifications-demo.component';
import { PaginationDemoComponent } from './pagination/pagination-demo.component';
import { PasswordResetDemoComponent } from './password-reset/password-reset-demo.component';
import { PopDemoComponent } from './pop/pop-demo.component';
import { PopTriggerComponent } from './pop/pop-trigger.component';
import { ResourceCrudDemoComponent } from './resource-crud/resource-crud-demo.component';
import { ResourceDeletePopDemoComponent } from './resource-delete-pop/resource-delete-pop-demo.component';
import { ResourceFormDemoComponent } from './resource-form/resource-form-demo.component';
import { ResourceListPopDemoComponent } from './resource-list-pop/resource-list-pop-demo.component';
import { ResourceSelectDemoComponent } from './resource-select/resource-select-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { SignupDemoComponent } from './signup/signup-demo.component';
import { SymbolDemoComponent } from './symbol/symbol-demo.component';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { TinyInputComponent } from './tinymce-demo/tiny-input.component';
import { TinymceDemoComponent } from './tinymce-demo/tinymce-demo.component';
/* import { CalendarModule } from '../../packages/calendar/src/calendar.module'; */

@NgModule({
  entryComponents: [CoolStringComponent, UnsplashImageComponent, CounterComponent, TinyInputComponent],
  declarations: [
    GithubSourceComponent,
    MenuComponent,
    GithubSourcesComponent,
    DoclinksComponent,
    DemoDashboardComponent,
    DemoComponent,
    PopDemoComponent,
    ModalDemoComponent,
    PopTriggerComponent,
    DataDemoComponent,
    ListDemoComponent,
    ListTransformsDemoComponent,
    PaginationDemoComponent,
    EntryListDemoComponent,
    EntryListSelectDemoComponent,
    ApiExplorerComponent,
    ResourceFormDemoComponent,
    ResourceCrudDemoComponent,
    ResourceListPopDemoComponent,
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
    SignupDemoComponent,
    CoolStringComponent,
    UnsplashImageComponent,
    AssetListDemoComponent,
    AssetDemoComponent,
    DatetimeDemoComponent,
    NotificationsDemoComponent,
    LoaderDemoComponent,
    MediumEditorDemoComponent,
    TinymceDemoComponent,
    TinyInputComponent,
    AceDemoComponent,
    IconDemoComponent,
    IconPipe,
    SymbolDemoComponent,
    ResourceDeletePopDemoComponent,
    ResourceSelectDemoComponent,
    FileListDemoComponent,
    LocationPickerDemoComponent,
    CounterComponent,
    LoginDemoComponent,
    ImageSelectPopDemoComponent,
    KeycommandsDemoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CalendarModule,
    UiModule,
    DataModule,
    RouterModule.forRoot(demoRoutes),
    TinymceModule,
    AceModule,
    MediumEditorModule,
    LocationModule,
    /* .forRoot({
      date: 'DD.MM.YYYY',
      time: 'HH:mm',
      month: 'MMMM YYYY',
    }) */
  ],
  providers: [
    {
      provide: 'useDesktopNotifications',
      useValue: false,
    },
    {
      provide: 'environment',
      useValue: {
        datamanagerID: '83cc6374',
        environment: 'stage',
        clientID: 'rest',
      },
    },
  ],
  bootstrap: [DemoComponent],
})
export class DemoModule {
  constructor() /* private symbol: SymbolService */ {
    /* this.symbol.use(en); */
    /* moment.locale(this.symbol.resolve('moment.locale')); */
  }
}
