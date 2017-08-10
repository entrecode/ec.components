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
    CoolStringComponent,
    UnsplashImageComponent,
  ],
  entryComponents: [
    CoolStringComponent,
    UnsplashImageComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    DataModule,
    VcModule,
    AuthModule,
    RouterModule.forRoot(demoRoutes)
  ],
  providers: [
    {
      provide: 'useDesktopNotifications',
      useValue: false
    }
  ],
  bootstrap: [DemoComponent]
})
export class DemoModule {
}
