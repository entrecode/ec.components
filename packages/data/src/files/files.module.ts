// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UiModule } from '@ec.components/ui/src/ui.module';
import { AssetSelectComponent } from './asset-select/asset-select.component';
import { FileService } from './file.service';
import { UploadComponent } from './upload/upload.component';
import { SdkModule } from '../sdk/sdk.module';
import { AssetDirective } from './asset/asset.directive';
import { ImageDirective } from './image/image.directive';
import { AssetListPopComponent } from './asset-list-pop/asset-list-pop.component';
import { ResourceModule } from '../resource/resource.module';
import { DropzoneDirective } from './dropzone/dropzone.directive';

@NgModule({
  entryComponents: [
    AssetSelectComponent,
    UploadComponent,
  ],
  declarations: [
    AssetListPopComponent,
    AssetSelectComponent,
    AssetDirective,
    DropzoneDirective,
    ImageDirective,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    SdkModule,
    ResourceModule
  ],
  exports: [
    AssetListPopComponent,
    AssetSelectComponent,
    AssetDirective,
    DropzoneDirective,
    ImageDirective,
    UploadComponent,
    SdkModule,
  ],
  providers: [
    FileService
  ],
})
export class FilesModule {
}
