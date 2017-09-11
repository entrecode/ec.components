"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const collection_1 = require("@ec.components/core/src/collection/collection");
/** The ec-loader can be plugged into various components to be triggered when they load stuff. */
class LoaderComponent {
    /** Injects the host element. */
    constructor(host) {
        this.host = host;
        /** The current stack of loading promises.*/
        this.stack = new collection_1.Collection([]);
        /** The loader's visibility status. */
        this.visible = false;
    }
    /** Shows the loader by setting .visible to the host. This method is NOT meant to be used from outside, */
    show() {
        this.visible = true; //show loader
        this.host.nativeElement.classList.add('visible');
    }
    /** Hide the loader by removing .visible from the host. This method is NOT meant to be used from outside, */
    hide() {
        this.visible = false; //show loader
        this.host.nativeElement.classList.remove('visible');
    }
    /** Tells loader to show until the given promise resolves. (includes all other promises that are waited upon)
     * Make sure the given promise is catched (so the loader will stop loading on error)! */
    wait(promise) {
        this.stack.add(promise); //add promise to stack
        this.show();
        const timestamp = Date.now();
        this.timestamp = timestamp; //get timestamp
        Promise.all(this.stack.items)
            .then(() => {
            if (timestamp === this.timestamp) {
                this.hide();
                this.stack.removeAll();
            }
        });
        return promise;
    }
}
LoaderComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-loader',
                templateUrl: './loader.component.html',
                styleUrls: ['./loader.component.scss']
            },] },
];
/** @nocollapse */
LoaderComponent.ctorParameters = () => [
    { type: core_1.ElementRef, },
];
exports.LoaderComponent = LoaderComponent;
//# sourceMappingURL=loader.component.js.map