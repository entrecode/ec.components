// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiModule } from '@ec.components/ui/src/ui.module';
import { ResourceModule } from '../resource/resource.module';
import { SdkModule } from '../sdk/sdk.module';
import { AssetListPopComponent } from './asset-list-pop/asset-list-pop.component';
import { AssetSelectComponent } from './asset-select/asset-select.component';
import { AssetDirective } from './asset/asset.directive';
import { AssetgroupSelectComponent } from './assetgroup-select/assetgroup-select.component';
import { DropzoneDirective } from './dropzone/dropzone.directive';
import { FileService } from './file.service';
import { ImageDirective } from './image/image.directive';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  entryComponents: [
    AssetSelectComponent,
    AssetgroupSelectComponent,
    UploadComponent,
  ],
  declarations: [
    AssetListPopComponent,
    AssetSelectComponent,
    AssetgroupSelectComponent,
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
    AssetgroupSelectComponent,
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
