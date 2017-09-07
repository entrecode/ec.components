"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
class EditorComponent {
    constructor(router) {
        this.router = router;
        console.log('router', this.router);
    }
}
EditorComponent.decorators = [
    { type: core_1.Component, args: [{
                template: '<h1>Works!</h1>'
            },] },
];
/** @nocollapse */
EditorComponent.ctorParameters = () => [
    { type: router_1.Router, },
];
exports.EditorComponent = EditorComponent;
//# sourceMappingURL=editor.component.js.map