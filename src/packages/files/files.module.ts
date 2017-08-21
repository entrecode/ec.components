import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AssetListComponent } from './asset-list/asset-list.component';
import { UiModule } from '../ui/ui.module';
import { DataModule } from '../data/data.module';
import { AssetSelectComponent } from './asset-select/asset-select.component';
import { FileService } from './file.service';
import { AssetInputComponent } from './asset-input/asset-input.component';

@NgModule({
  entryComponents: [
    AssetListComponent,
    AssetSelectComponent,
    AssetInputComponent,
  ],
  declarations: [
    AssetListComponent,
    AssetSelectComponent,
    AssetInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UiModule,
    DataModule,
  ],
  exports: [
    AssetListComponent,
    AssetSelectComponent,
    AssetInputComponent,
  ],
  providers: [
    FileService
  ],
})
export class FilesModule {
}