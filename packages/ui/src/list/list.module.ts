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

@NgModule({
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
  providers: []
})
export class ListModule {
}
