import { Component, ElementRef } from '@angular/core';
import { Collection } from '@ec.components/core/src/collection/collection';

/** The ec-loader can be plugged into various components to be triggered when they load stuff.
 * <example-url>https://components.entrecode.de/ui/loader</example-url>
*/
@Component({
  selector: 'ec-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  /** The current stack of loading promises.*/
  private stack: Collection<Promise<any>> = new Collection([]);
  /** The loader's visibility status. */
  private visible = false;
  /** The timestamp of the last time a promise has been added to the stack. */
  private timestamp;

  /** Injects the host element. */
  constructor(private host: ElementRef) {
  }

  /** Shows the loader by setting .visible to the host. This method is NOT meant to be used from outside, */
  private show() {
    this.visible = true; // show loader
    this.host.nativeElement.classList.add('is-active');
  }

  /** Hide the loader by removing .visible from the host. This method is NOT meant to be used from outside, */
  private hide() {
    this.visible = false; // show loader
    this.host.nativeElement.classList.remove('is-active');
  }

  /** Tells loader to show until the given promise resolves. (includes all other promises that are waited upon)
   * Make sure the given promise is catched (so the loader will stop loading on error)! */
  wait(promise: Promise<any>) {
    this.stack.add(promise); // add promise to stack
    this.show();
    const timestamp = Date.now();
    this.timestamp = timestamp; // get timestamp
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
