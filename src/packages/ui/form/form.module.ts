import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormComponent } from './form.component';
import { DefaultInputComponent } from '../input/default-input.component';
import { DefaultOutputComponent } from '../output/default-output.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SelectComponent } from '../select/select.component';
import { PopModule } from '../pop/pop.module';
import { FormService } from './form.service';
import { VisibleFieldsPipe } from './visible-fields.pipe';
import { IoModule } from '../dynamic-slot/io.module';

@NgModule({
  entryComponents: [
    DefaultInputComponent,
    DefaultOutputComponent,
  ],
  declarations: [
    FormComponent,
    DefaultInputComponent,
    DefaultOutputComponent,
    SelectComponent,
    VisibleFieldsPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    PopModule,
    IoModule,
  ],
  exports: [
    FormComponent,
    ReactiveFormsModule,
    SelectComponent,
    PopModule,
    VisibleFieldsPipe,
    IoModule,
  ],
  providers: [
    FormService
  ]
})
export class FormModule {
}
