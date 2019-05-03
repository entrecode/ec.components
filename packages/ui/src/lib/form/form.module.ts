import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PopModule } from '../pop/pop.module';
import { FormService } from './form.service';
import { VisibleFieldsPipe } from './visible-fields.pipe';
import { IoModule } from '../io/io.module';
import { DatetimeComponent } from './datetime/datetime.component';
import { ToggleComponent } from './toggle/toggle.component';
import { LoaderModule } from '../loader/loader.module';
import { IconModule } from '../icon/icon.module';
import { MaxItemsPipe } from './max-items.pipe';
import { SymbolModule } from '../symbol/symbol.module';
import { DefaultInputComponent } from './default-input/default-input.component';
import { DefaultOutputComponent } from './default-output/default-output.component';
import { CalendarModule } from '@ec.components/calendar';
import { UtilityModule } from '../utility/utility.module';

export const formModuleConfig = {
  entryComponents: [DefaultInputComponent, DefaultOutputComponent],
  declarations: [
    FormComponent,
    DatetimeComponent,
    VisibleFieldsPipe,
    MaxItemsPipe,
    ToggleComponent,
    DefaultInputComponent,
    DefaultOutputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PopModule,
    IoModule,
    LoaderModule,
    IconModule,
    SymbolModule,
    CalendarModule,
    UtilityModule,
  ],
  exports: [
    UtilityModule,
    ReactiveFormsModule,
    IoModule,
    FormComponent,
    DatetimeComponent,
    PopModule,
    VisibleFieldsPipe,
    MaxItemsPipe,
    ToggleComponent,
  ],
  providers: [
    FormService,
    /* {
      provide: 'moment.format.date',
      useValue: SymbolService.resolve('moment.format.date')
    },
    {
      provide: 'moment.format.time',
      useValue: SymbolService.resolve('moment.format.time')
    },
    {
      provide: 'moment.format.month',
      useValue: SymbolService.resolve('moment.format.month')
    } */
  ],
};

@NgModule(formModuleConfig)
export class FormModule {}
