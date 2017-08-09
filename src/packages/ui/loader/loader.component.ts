import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Collection } from '../../core/collection/collection';

/** The ec-loader can be plugged into various components to be triggered when they load stuff. */
@Component({
  selector: 'ec-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  stack: Collection<Promise<any>> = new Collection();
  visible: boolean = false;
  timestamp;

  constructor(private host: ElementRef, private renderer: Renderer2) {
  }

  show() {
    this.visible = true; //show loader
    this.host.nativeElement.classList.add('visible');
  }

  hide() {
    this.visible = false; //show loader
    this.host.nativeElement.classList.remove('visible');
  }

  wait(promise: Promise<any>) {
    this.stack.add(promise); //add promise to stack
    this.show();
    const timestamp = Date.now();
    this.timestamp = timestamp; //get timestamp
    Promise.all(this.stack.items).then(() => {
      //show loader when stack is finished
      if (timestamp === this.timestamp) {
        this.hide();
      }
    });
    return promise.then((res: any) => {
      this.stack.remove(promise); //remove promise from stack when done
      return res;
    });
  }
}
