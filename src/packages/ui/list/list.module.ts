// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ListComponent } from './list.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { GroupPipe } from './group.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { FormModule } from '../form/form.module';

@NgModule({
  declarations: [
    ListComponent,
    ListItemsComponent,
    ListHeaderComponent,
    PaginationComponent,
    GroupPipe,
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    HttpModule,
    FormModule,
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
