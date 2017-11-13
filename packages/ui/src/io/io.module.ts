import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicSlotComponent } from './dynamic-slot/dynamic-slot.component';
import { SlotHostDirective } from './slot-host.directive';
import { DefaultInputComponent } from '../form/default-input/default-input.component';
import { DefaultOutputComponent } from '../form/default-output/default-output.component';
import { OutputComponent } from './output/output.component';
import { InputComponent } from './input/input.component';
import { InputErrorsComponent } from './input-errors/input-errors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicRackComponent } from './dynamic-rack/dynamic-rack.component';

@NgModule({
  entryComponents: [
    DefaultInputComponent,
    DefaultOutputComponent,
    InputComponent,
    OutputComponent,
    InputErrorsComponent,
  ],
  declarations: [
    InputErrorsComponent,
    SlotHostDirective,
    DynamicSlotComponent,
    DynamicRackComponent,
    InputComponent,
    OutputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    SlotHostDirective,
    DynamicSlotComponent,
    DynamicRackComponent,
    InputComponent,
    OutputComponent,
    InputErrorsComponent,
    ReactiveFormsModule,
  ],
  providers: []
})
export class IoModule {
}
