import {Component, ElementRef, Input, ViewChild, ViewChildren, QueryList, AfterViewInit} from '@angular/core';
import { Pagination } from '@ec.components/core';
import { OnInit } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { PaginationConfig } from './pagination-config.interface';

/**
 * The Pagination component renders a given instance of the Pagination class.
 */
@Component({
  selector: 'ec-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent<T> implements OnInit, OnChanges, AfterViewInit {
  /** A Pagination Instance */
  @Input() pagination: Pagination<T>;
  /** The div container for the pages*/
  @ViewChild('container') private container: ElementRef;
  /** The ul around pages */
  @ViewChild('pageContainer') private pageContainer: ElementRef;
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
    this.pagination.change$.subscribe((config) => {
      this.translateContainer();
    });
    this.config = new PaginationConfig(this.config);
  }
  /** When the view is ready, the container is translated.  */
  ngAfterViewInit() {
    this.translateContainer();
  }

  /** Translates the page container that the current page is in the middle */
  translateContainer() {
    if (!this.page || !this.pageContainer) {
      // console.warn('pages not ready');
      return;
    }
    const itemWidth = this.page.first.nativeElement.clientWidth;
    const page = this.pagination.getPage();
    let translation = Math.max(0, itemWidth * (page - this.config.range - 1));
    translation = Math.min(translation, (this.pagination.getPages() - (2 * this.config.range) - 1) * itemWidth);
    this.pageContainer.nativeElement.style = `transform:translateX(-${translation}px)`;
    this.container.nativeElement.style = `max-width:${(1 + 2 * this.config.range) * itemWidth}px`;
  }

  /** Determines if a page should be visible */
  isVisible(page) {
    const current = this.pagination.getPage();
    return Math.abs(current - page) < this.config.range + 1 + Math.max(0, this.config.range - current + 1) + Math.max(0, current - this.pagination.getPages() + this.config.range);
  }
}
