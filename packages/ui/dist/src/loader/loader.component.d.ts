import { ElementRef } from '@angular/core';
/** The ec-loader can be plugged into various components to be triggered when they load stuff. */
export declare class LoaderComponent {
    private host;
    /** The current stack of loading promises.*/
    private stack;
    /** The loader's visibility status. */
    private visible;
    /** The timestamp of the last time a promise has been added to the stack. */
    private timestamp;
    /** Injects the host element. */
    constructor(host: ElementRef);
    /** Shows the loader by setting .visible to the host. This method is NOT meant to be used from outside, */
    private show();
    /** Hide the loader by removing .visible from the host. This method is NOT meant to be used from outside, */
    private hide();
    /** Tells loader to show until the given promise resolves. (includes all other promises that are waited upon)
     * Make sure the given promise is catched (so the loader will stop loading on error)! */
    wait(promise: Promise<any>): Promise<any>;
}
