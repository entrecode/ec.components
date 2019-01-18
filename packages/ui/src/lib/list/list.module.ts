import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormModule } from '../form/form.module';
import { IconModule } from '../icon/icon.module';
import { SymbolModule } from '../symbol/symbol.module';
import { UtilityModule } from '../utility/utility.module';
import { GroupPipe } from './group.pipe';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListComponent } from './list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ListConfigService } from './list-config.service';
import { FormsModule } from '@angular/forms';

export const listModuleConfig = {
  declarations: [
    ListComponent,
    ListItemsComponent,
    ListHeaderComponent,
    PaginationComponent,
    SearchbarComponent,
    GroupPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormModule,
    IconModule,
    SymbolModule,
    UtilityModule
  ],
  exports: [
    ListComponent,
    ListItemsComponent,
    ListHeaderComponent,
    PaginationComponent,
    SearchbarComponent,
    GroupPipe,
    FormModule,
  ],
  providers: [
    ListConfigService
  ]
};

@NgModule(listModuleConfig)
export class ListModule {
}
