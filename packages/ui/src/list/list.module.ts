import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { GroupPipe } from './group.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { FormModule } from '../form/form.module';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [
    ListComponent,
    ListItemsComponent,
    ListHeaderComponent,
    PaginationComponent,
    GroupPipe,
  ],
  imports: [
    CommonModule,
    FormModule,
    IconModule,
  ],
  exports: [
    ListComponent,
    ListItemsComponent,
    ListHeaderComponent,
    PaginationComponent,
    GroupPipe,
    FormModule,
  ],
  providers: []
})
export class ListModule {
}
