// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiModule } from '@ec.components/ui';
import { AssetListComponent } from '../asset-list/asset-list.component';
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
import { UploadSelectComponent } from './upload-select/upload-select.component';
import { ImageSelectPopComponent } from './image-select-pop/image-select-pop.component';
import { TagSelectComponent } from './tag-select/tag-select.component';
import { DndModule } from 'ngx-drag-drop';

@NgModule({
  entryComponents: [
    AssetSelectComponent,
    AssetgroupSelectComponent,
    UploadComponent,
    TagSelectComponent
  ],
  declarations: [
    AssetListComponent,
    AssetListPopComponent,
    AssetSelectComponent,
    AssetgroupSelectComponent,
    AssetDirective,
    DropzoneDirective,
    ImageDirective,
    UploadComponent,
    UploadSelectComponent,
    ImageSelectPopComponent,
    TagSelectComponent,
  ],
  imports: [CommonModule, DndModule, FormsModule, UiModule, SdkModule, ResourceModule],
  exports: [
    AssetListComponent,
    AssetListPopComponent,
    AssetSelectComponent,
    AssetgroupSelectComponent,
    AssetDirective,
    DropzoneDirective,
    ImageDirective,
    UploadComponent,
    UploadSelectComponent,
    SdkModule,
    ImageSelectPopComponent,
    TagSelectComponent,
  ],
  providers: [FileService],
})
export class FilesModule { }
