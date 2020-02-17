import { NgModule } from '@angular/core';
import { ListModule } from './list/list.module';
import { PopModule } from './pop/pop.module';
import { LoaderModule } from './loader/loader.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UtilityModule } from './utility/utility.module';
import { SelectModule } from './select/select.module';
import { IconModule } from './icon/icon.module';
import { SymbolModule } from './symbol/symbol.module';
import { FormModule } from './form/form.module';

@NgModule({
  imports: [
    UtilityModule,
    NotificationsModule,
    PopModule,
    LoaderModule,
    FormModule,
    ListModule,
    SelectModule,
    IconModule,
    SymbolModule,
  ],
  exports: [
    UtilityModule,
    PopModule,
    NotificationsModule,
    LoaderModule,
    ListModule,
    FormModule,
    SelectModule,
    IconModule,
    SymbolModule,
  ],
})
export class UiModule { }
