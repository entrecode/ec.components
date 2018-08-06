// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UiModule } from '../../../ui';
import { SdkModule } from '../sdk/sdk.module';
import { ResourceListComponent } from '../resource-list/resource-list.component';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { ResourcePopComponent } from '../resource-pop/resource-pop.component';
import { ResourceCrudComponent } from '../resource-crud/resource-crud.component';
import { ResourceDeletePopComponent } from '../resource-delete-pop/resource-delete-pop.component';
import { ResourceSelectComponent } from '../resource-select/resource-select.component';
import { ResourceService } from '../resource-config/resource.service';
import { ResourceConfig } from '../resource-config/resource-config.service';
import { ResourceListPopComponent } from '../resource-list-pop/resource-list-pop.component';

@NgModule({
  entryComponents: [
    ResourceListComponent,
  ],
  declarations: [
    ResourceListComponent,
    ResourceListPopComponent,
    ResourceFormComponent,
    ResourcePopComponent,
    ResourceCrudComponent,
    ResourceDeletePopComponent,
    ResourceSelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    SdkModule,
  ],
  exports: [
    UiModule,
    SdkModule,
    ResourceListComponent,
    ResourceListPopComponent,
    ResourceFormComponent,
    ResourcePopComponent,
    ResourceCrudComponent,
    ResourceDeletePopComponent,
    ResourceSelectComponent,
  ],
  providers: [
    ResourceService,
    ResourceConfig,
  ],
})
export class ResourceModule {
}
