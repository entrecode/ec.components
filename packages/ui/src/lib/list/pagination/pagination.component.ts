import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Pagination } from '@ec.components/core';
import { PaginationConfig } from './pagination-config.interface';

/**
 * The Pagination component renders a given instance of the Pagination class.
 */
@Component({
  selector: 'ec-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent<T> implements OnChanges, OnInit {
  /** A Pagination Instance */
  @Input() pagination: Pagination<T>;
  /** The div container for the pages*/
  @ViewChild('container', { static: false }) private container: ElementRef;
  /** The ul around pages */
  @ViewChild('pageContainer', { static: false }) private pageContainer: ElementRef;
  /** The pages li elements. The first one is used to determine the container translation. */
  @ViewChildren('page') private page: QueryList<ElementRef>;
  /** The config that is used */
  @Input() config: PaginationConfig;

  /** Init config. */
  ngOnInit() {
    this.config = new PaginationConfig(this.config);
  }

  /** As soon as the pagination is known, the change$ event is subscribed to translate the container on change.*/
  ngOnChanges() {
    if (!this.pagination) {
      return;
    }
    this.config = new PaginationConfig(this.config);
  }

  /** Determines if a page should be visible */
  isVisible(page) {
    const current = this.pagination.getPage();
    return (
      Math.abs(current - page) <
      this.config.range +
        1 +
        Math.max(0, this.config.range - current + 1) +
        Math.max(0, current - this.pagination.getPages() + this.config.range)
    );
  }

  updateSize(value: string) {
    if (!value) {
      return;
    }
    // tslint:disable-next-line:radix
    this.pagination.updateSize(parseInt(value));
  }
}
