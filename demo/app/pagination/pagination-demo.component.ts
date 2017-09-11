import { Component } from '@angular/core';
import { Pagination } from '../../../packages/core/src/pagination/pagination';

@Component({
  selector: 'ec-pagination-demo',
  template: require('./pagination-demo.component.html'),
})
export class PaginationDemoComponent {
  public pagination = new Pagination({});
  currentPage: number = this.pagination.getPage();

  constructor() {
    this.pagination.setTotal(5100);
    this.pagination.change$.debounceTime(500)
    .subscribe((p) => {
      this.currentPage = this.pagination.getPage();
    });
  }
}
