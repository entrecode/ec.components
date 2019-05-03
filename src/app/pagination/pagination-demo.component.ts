import { Component } from '@angular/core';
import { Pagination } from '@ec.components/core';
import { SymbolService } from '@ec.components/ui';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ec-pagination-demo',
  templateUrl: './pagination-demo.component.html',
})
export class PaginationDemoComponent {
  public pagination = new Pagination({});
  currentPage: number = this.pagination.getPage();

  constructor(symbol: SymbolService) {
    /* symbol.set([{
      name: 'pagination.next',
      content: 'NEGSCHT'
    }]); */
    this.pagination.setTotal(5100);
    this.pagination.change$.pipe(debounceTime(500)).subscribe((p) => {
      this.currentPage = this.pagination.getPage();
    });
  }
}
