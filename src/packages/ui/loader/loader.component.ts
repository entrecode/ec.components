import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Collection } from '../../core/collection/collection';

/** The ec-loader can be plugged into various components to be triggered when they load stuff. */
@Component({
  selector: 'ec-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  private stack: Collection<Promise<any>> = new Collection();
  private visible: boolean = false;
  private timestamp;

  constructor(private host: ElementRef) {
  }

  private show() {
    this.visible = true; //show loader
    this.host.nativeElement.classList.add('visible');
  }

  private hide() {
    this.visible = false; //show loader
    this.host.nativeElement.classList.remove('visible');
  }

  /** Tells loader to show until the given promise resolves. (includes all other promises that are waited upon)
   * Make sure the given promise is catched!. */
  wait(promise: Promise<any>) {
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
