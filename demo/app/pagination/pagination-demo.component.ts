import { Component } from '@angular/core';
import { Pagination } from '../../../packages/core/src/pagination/pagination';
import { SymbolService } from '../../../packages/ui/src/symbol/symbol.service';
import 'rxjs/add/operator/debounceTime';

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
    this.pagination.change$.debounceTime(500)
      .subscribe((p) => {
        this.currentPage = this.pagination.getPage();
      });
  }
}
