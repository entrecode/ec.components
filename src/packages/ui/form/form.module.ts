import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormComponent } from './form.component';
import { InputComponent } from '../input/input.component';
import { DefaultInputComponent } from '../input/default-input.component';
import { DefaultOutputComponent } from '../output/default-output.component';
import { DynamicSlotComponent } from '../dynamic-slot/dynamic-slot.component';
import { OutputComponent } from '../output/output.component';
import { InputErrorsComponent } from '../input-errors/input-errors.component';
import { SlotHostDirective } from '../dynamic-slot/slot-host.directive';
import { ReactiveFormsModule } from "@angular/forms";
import { SelectComponent } from '../select/select.component';
import { PopModule } from '../pop/pop.module';
import { SelectionComponent } from '../select/selection.component';
import { FormService } from './form.service';
import { VisibleFieldsPipe } from './visible-fields.pipe';

@NgModule({
  entryComponents: [
    DefaultInputComponent,
    DefaultOutputComponent,
  ],
  declarations: [
    FormComponent,
    InputComponent,
    OutputComponent,
    DefaultInputComponent,
    DefaultOutputComponent,
    DynamicSlotComponent,
    InputErrorsComponent,
    SlotHostDirective,
    SelectComponent,
    SelectionComponent,
    VisibleFieldsPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    PopModule,
  ],
  exports: [
    FormComponent,
    InputComponent,
    OutputComponent,
    InputErrorsComponent,
    SlotHostDirective,
    ReactiveFormsModule,
    SelectComponent,
    SelectionComponent,
    PopModule,
    VisibleFieldsPipe,
  ],
  providers: [
    FormService
  ]
})
export class FormModule {
}
