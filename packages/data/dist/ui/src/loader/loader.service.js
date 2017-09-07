"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/** The loader service registers promises */
class LoaderService {
    /** Sets a global loader that can be triggered without having the reference. */
    use(loader) {
        this.loader = loader;
    }
    /** Tells the given loader to wait for the given promise. If no loader is given, the global loader is used (if set)*/
    wait(promise, loader = this.loader) {
        if (!loader || !promise) {
            // console.warn('cannot trigger loader: no promise or loader given');
            return;
        }
        return loader.wait(promise);
    }
}
LoaderService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
LoaderService.ctorParameters = () => [];
exports.LoaderService = LoaderService;
//# sourceMappingURL=loader.service.js.map