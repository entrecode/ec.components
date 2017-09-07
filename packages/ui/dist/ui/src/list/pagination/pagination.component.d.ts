import { Pagination } from '@ec.components/core';
/**
 * The Pagination component renders a given instance of the Pagination class.
 */
export declare class PaginationComponent<T> {
    /** A Pagination Instance */
    pagination: Pagination<T>;
    /** Range of displayed pages in the UI. Controls the number of pages before and after the current page. Defaults to 3.
     * NOTE: For a smoother UX, there are minimum ```2 * range + 1``` pages visible.*/
    range: number;
    /** The container for the pages*/
    private container;
    /** The item ViewChild is used to determine the size of the pagination buttons to calculate the offset for animation. */
    private item;
    /** The current translation of the pagination page list. The current page is always in the middle. */
    private translation;
    /** The containerWidth of all pages. Needed for animation */
    containerWidth: number;
    /** When intitializing, the containerWidth is saved. */
    private ngOnInit();
    /** As soon as the pagination is known, the change$ event is subscribed to translate the container on change.*/
    private ngOnChanges();
    /** Translates the page container that the current page is in the middle */
    translateContainer(page: any): void;
    /** Determines if a page should be visible */
    isVisible(page: any): boolean;
}
