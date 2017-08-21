import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AssetListComponent } from './asset-list/asset-list.component';
import { UiModule } from '../ui/ui.module';
import { DataModule } from '../data/data.module';

@NgModule({
  entryComponents: [
    AssetListComponent,
  ],
  declarations: [
    AssetListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UiModule,
    DataModule,
  ],
  exports: [
    AssetListComponent,
  ],
  providers: [],
})
export class FilesModule {
}