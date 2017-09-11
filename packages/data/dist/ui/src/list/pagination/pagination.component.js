"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/**
 * The Pagination component renders a given instance of the Pagination class.
 */
class PaginationComponent {
    constructor() {
        /** Range of displayed pages in the UI. Controls the number of pages before and after the current page. Defaults to 3.
         * NOTE: For a smoother UX, there are minimum ```2 * range + 1``` pages visible.*/
        this.range = 2;
    }
    /** When intitializing, the containerWidth is saved. */
    ngOnInit() {
        this.containerWidth = (1 + 2 * this.range) * this.item.nativeElement.clientWidth;
    }
    /** As soon as the pagination is known, the change$ event is subscribed to translate the container on change.*/
    ngOnChanges() {
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
PaginationComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-pagination',
                template: require('./pagination.component.html'),
                styles: [require('./pagination.component.scss')]
            },] },
];
/** @nocollapse */
PaginationComponent.ctorParameters = () => [];
PaginationComponent.propDecorators = {
    'pagination': [{ type: core_1.Input },],
    'range': [{ type: core_1.Input },],
    'container': [{ type: core_1.ViewChild, args: ['container',] },],
    'item': [{ type: core_1.ViewChild, args: ['item',] },],
};
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map