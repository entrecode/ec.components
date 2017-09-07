"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/** The field host is a helper to load components inside its view container.
 * see https://angular.io/guide/dynamic-component-loader
 * */
class SlotHostDirective {
    /** The constructor exposes the viewContainer that is used to load components into from outside.*/
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
SlotHostDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[ec-slot-host]',
            },] },
];
/** @nocollapse */
SlotHostDirective.ctorParameters = () => [
    { type: core_1.ViewContainerRef, },
];
exports.SlotHostDirective = SlotHostDirective;
//# sourceMappingURL=slot-host.directive.js.map