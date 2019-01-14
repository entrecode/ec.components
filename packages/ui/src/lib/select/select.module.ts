import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DndModule } from 'ngx-drag-drop';
import { ListModule } from '../list/list.module';
import { SelectComponent } from './select.component';
import { ActionbarComponent } from '../actionbar/actionbar.component';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    ListModule,
    DndModule,
    LoaderModule
  ],
  declarations: [
    SelectComponent,
    ActionbarComponent
  ],
  exports: [
    ListModule,
    SelectComponent,
    ActionbarComponent,
    DndModule
  ],
  providers: [],
})
export class SelectModule {
}
