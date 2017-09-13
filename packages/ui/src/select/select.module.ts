import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { ListModule } from '../list/list.module';

@NgModule({
  imports: [
    CommonModule,
    ListModule
  ],
  declarations: [SelectComponent],
  exports: [ListModule, SelectComponent],
  providers: [],
})
export class SelectModule {
}
