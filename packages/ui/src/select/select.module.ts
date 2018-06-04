import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DndModule } from 'ngx-drag-drop';
import { ListModule } from '../list/list.module';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [
    CommonModule,
    ListModule,
    DndModule
  ],
  declarations: [SelectComponent],
  exports: [
    ListModule,
    SelectComponent,
    DndModule
  ],
  providers: [],
})
export class SelectModule {
}
