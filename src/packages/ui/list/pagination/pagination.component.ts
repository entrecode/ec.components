import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Pagination } from '../../../core/index';

/**
 * The Pagination component renders a given instance of the Pagination class.
 */
@Component({
  selector: 'ec-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent<T> {
  /** A Pagination Instance */
  @Input() pagination: Pagination<T>;
  /** Range of displayed pages in the UI. Controls the number of pages before and after the current page. Defaults to 3.
   * NOTE: For a smoother UX, there are minimum ```2 * range + 1``` pages visible.*/
  @Input() range: number = 2;
  /** The container for the pages*/
  @ViewChild('container') private container: ElementRef;
  /** The item ViewChild is used to determine the size of the pagination buttons to calculate the offset for animation. */
  @ViewChild('item') private item: ElementRef;
  /** The current translation of the pagination page list. The current page is always in the middle. */
  private translation: string;
  /** The containerWidth of all pages. Needed for animation */
  public containerWidth: number;

  /** When intitializing, the containerWidth is saved. */
  private ngOnInit() {
    this.containerWidth = (1 + 2 * this.range) * this.item.nativeElement.clientWidth;
  }

  /** As soon as the pagination is known, the change$ event is subscribed to translate the container on change.*/
  private ngOnChanges() {
    if (!this.pagination) {
      return;
    }
    this.pagination.change$.subscribe((config) => {
      this.translateContainer(this.pagination.getPage());
    });
  }

  /** Translates the page container that the current page is in the middle */
  translateContainer(page) {
    const itemWidth = this.item.nativeElement.clientWidth;
    let translation = Math.max(0, itemWidth * (page - this.range - 1));
    translation = Math.min(translation, (this.pagination.getPages() - (2 * this.range) - 1) * itemWidth);
    this.translation = `translateX(-${translation}px)`;
  }

  /** Determines if a page should be visible */
  isVisible(page) {
    const current = this.pagination.getPage();
    return Math.abs(current - page) < this.range + 1 + Math.max(0, this.range - current + 1) + Math.max(0, current - this.pagination.getPages() + this.range);
  }
}
