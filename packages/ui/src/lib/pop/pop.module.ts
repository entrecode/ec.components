import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopComponent } from './pop.component';
import { PopService } from './pop.service';
import { ModalComponent } from '../modal/modal.component';
import { IconModule } from '../icon/icon.module';

export const popModuleConfig = {
  declarations: [
    PopComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    PopComponent,
    ModalComponent,
  ],
  providers: [PopService]
};

@NgModule(popModuleConfig)
export class PopModule {
}
