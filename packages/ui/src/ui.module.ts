import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListModule } from './list/list.module';
import { FormModule } from './form/form.module';
import { PopModule } from './pop/pop.module';
import { LoaderModule } from './loader/loader.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UtilityModule } from './utility/utility.module';
import { SelectModule } from './select/select.module';
import { InteractionModule } from './interaction/interaction.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    UtilityModule,
    NotificationsModule,
    PopModule,
    LoaderModule,
    FormModule,
    ListModule,
    SelectModule,
    InteractionModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    UtilityModule,
    PopModule,
    NotificationsModule,
    LoaderModule,
    ListModule,
    FormModule,
    SelectModule,
    InteractionModule,
  ]
})
export class UiModule {
}
