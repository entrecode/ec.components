import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DynamicSlotComponent } from './dynamic-slot.component';
import { SlotHostDirective } from './slot-host.directive';
import { DefaultInputComponent } from '../input/default-input.component';
import { DefaultOutputComponent } from '../output/default-output.component';
import { OutputComponent } from '../output/output.component';
import { InputComponent } from '../input/input.component';
import { InputErrorsComponent } from '../input-errors/input-errors.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  entryComponents: [
    DefaultInputComponent,
    DefaultOutputComponent,
    InputComponent,
    OutputComponent,
  ],
  declarations: [
    SlotHostDirective,
    DynamicSlotComponent,
    InputComponent,
    OutputComponent,
    InputErrorsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  exports: [
    SlotHostDirective,
    DynamicSlotComponent,
    InputComponent,
    OutputComponent,
    InputErrorsComponent,
    ReactiveFormsModule,
  ],
  providers: []
})
export class IoModule {
}
