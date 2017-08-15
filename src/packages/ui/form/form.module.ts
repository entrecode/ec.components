import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormComponent } from './form.component';
import { InputComponent } from '../input/input.component';
import { DefaultInputComponent } from '../input/default-input.component';
import { DefaultOutputComponent } from '../output/default-output.component';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';
import { OutputComponent } from '../output/output.component';
import { InputErrorsComponent } from '../input-errors/input-errors.component';
import { FieldHostDirective } from '../dynamic-field/field-host.directive';
import { ReactiveFormsModule } from "@angular/forms";
import { SelectComponent } from '../select/select.component';
import { PopModule } from '../pop/pop.module';
import { SelectionComponent } from '../select/selection.component';

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
    DynamicFieldComponent,
    InputErrorsComponent,
    FieldHostDirective,
    SelectComponent,
    SelectionComponent,
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
    FieldHostDirective,
    ReactiveFormsModule,
    SelectComponent,
    SelectionComponent,
    PopModule,
  ],
  providers: []
})
export class FormModule {
}
