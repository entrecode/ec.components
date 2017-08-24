import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DynamicSlotComponent } from './dynamic-slot/dynamic-slot.component';
import { SlotHostDirective } from './slot-host.directive';
import { DefaultInputComponent } from '../form/default-input/default-input.component';
import { DefaultOutputComponent } from '../form/default-output/default-output.component';
import { OutputComponent } from './output/output.component';
import { InputComponent } from './input/input.component';
import { InputErrorsComponent } from './input-errors/input-errors.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    InputComponent,
    OutputComponent,
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
