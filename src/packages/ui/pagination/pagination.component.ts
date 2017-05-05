import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Pagination } from '@ec.components/core';
/**
 * The Pagination component renders a given instance of the Pagination class.
 * The navigation b
 */
@Component({
  selector: 'ec-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  /** A Pagination Instance */
  @Input() pagination: Pagination;
  /** Range of displayed pages in the UI. Controls the number of pages before and after the current page. Defaults to 3.
   * NOTE: For a smoother UX, there are minimum ```2 * range + 1``` pages visible.*/
  @Input() range: number = 2;
  @ViewChild('container') private container: ElementRef;
  @ViewChild('item') private item: ElementRef;
  @ViewChild('pages') private pages: ElementRef;
  private translation: string;
  private containerWidth: number;

  private ngOnInit() {
    this.containerWidth = (1 + 2 * this.range) * this.item.nativeElement.clientWidth;
  }

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
