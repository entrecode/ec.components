// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AssetListComponent } from './asset-list/asset-list.component';
import { UiModule } from '@ec.components/ui/ui.module';
import { DataModule } from '../data.module';
import { AssetSelectComponent } from './asset-select/asset-select.component';
import { FileService } from './file.service';
import { AssetInputComponent } from './asset-input/asset-input.component';
import { UploadComponent } from './upload/upload.component';
import { SdkModule } from '../sdk/sdk.module';

@NgModule({
  entryComponents: [
    AssetListComponent,
    AssetSelectComponent,
    AssetInputComponent,
    UploadComponent,
  ],
  declarations: [
    AssetListComponent,
    AssetSelectComponent,
    AssetInputComponent,
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
    AssetInputComponent,
    UploadComponent,
    SdkModule,
  ],
  providers: [
    FileService
  ],
})
export class FilesModule {
}