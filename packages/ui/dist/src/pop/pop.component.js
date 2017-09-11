"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by felix on 26.05.17.
 */
const core_1 = require("@angular/core");
/** A Pop is an area of content whose visibility can be toggled.
 * It can be used e.g as popup, modal or dropdown.*/
class PopComponent {
    constructor() {
        /** Emits the value of visible on change. */
        this._toggle = new core_1.EventEmitter();
        /** The amount of time between setting active and visible. Defaults to 0. */
        this.delay = 0;
    }
    /** Shows if not visible, hides if visible. */
    toggle(visible = !this.visible, emit = false) {
        if (!visible) {
            this.hide();
        }
        else {
            this.show();
        }
        if (emit) {
            this._toggle.emit(visible);
        }
    }
    /** Shows the pop. First sets active and after the delay it sets visible. */
    show() {
        this.active = true;
        setTimeout(() => {
            this.visible = true;
        }, this.delay);
    }
    /** Hides the pop. First removes visible and after the delay it removes active. */
    hide() {
        this.visible = false;
        if (!this.delay) {
            return;
        }
        setTimeout(() => {
            this.active = false;
        }, this.delay);
    }
}
PopComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-pop',
                templateUrl: './pop.component.html',
                styleUrls: ['./pop.component.scss']
            },] },
];
/** @nocollapse */
PopComponent.ctorParameters = () => [];
PopComponent.propDecorators = {
    'active': [{ type: core_1.Input },],
    'visible': [{ type: core_1.Input },],
    '_toggle': [{ type: core_1.Output, args: ['toggle',] },],
};
exports.PopComponent = PopComponent;
//# sourceMappingURL=pop.component.js.map