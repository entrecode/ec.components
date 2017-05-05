import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UiModule } from '@ec.components/ui';
import { EntryListComponent } from './entry-list/entry-list.component';

@NgModule({
  declarations: [
    EntryListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UiModule
  ],
  exports: [
    EntryListComponent
  ],
  providers: [],
})
export class DataModule {
}