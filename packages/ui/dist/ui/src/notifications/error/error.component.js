"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/** The CrudComponent takes at least a model name to render an entry list with create/edit/delete functionality out of the box.  */
/** Displays an error thrown by the SDK. */
class ErrorComponent {
}
ErrorComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-error',
                template: require('./error.component.html')
            },] },
];
/** @nocollapse */
ErrorComponent.ctorParameters = () => [];
ErrorComponent.propDecorators = {
    'error': [{ type: core_1.Input },],
};
exports.ErrorComponent = ErrorComponent;
//# sourceMappingURL=error.component.js.map