import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopComponent } from './pop.component';
import { PopService } from './pop.service';
import { ModalComponent } from '../modal/modal.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [
    PopComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    PopComponent,
    ModalComponent
  ],
  providers: [PopService]
})
export class PopModule {
}
