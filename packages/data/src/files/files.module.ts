// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AssetListComponent } from './asset-list/asset-list.component';
import { UiModule } from '@ec.components/ui/src/ui.module';
import { AssetSelectComponent } from './asset-select/asset-select.component';
import { FileService } from './file.service';
import { UploadComponent } from './upload/upload.component';
import { SdkModule } from '../sdk/sdk.module';
import { PublicAssetDirective } from './public-asset/public-asset.directive';
import { ImageDirective } from './image/image.directive';

@NgModule({
  entryComponents: [
    AssetListComponent,
    AssetSelectComponent,
    UploadComponent,
  ],
  declarations: [
    AssetListComponent,
    AssetSelectComponent,
    PublicAssetDirective,
    ImageDirective,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    SdkModule,
  ],
  exports: [
    AssetListComponent,
    AssetSelectComponent,
    PublicAssetDirective,
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
