import { Injectable } from '@angular/core';
import { Collection } from '@ec.components/core';
import { PopComponent } from './pop.component';

/** Holds a stack of all open pops. listens for escape keydown events to close the latest opened pop. */
@Injectable()
export class PopService {
    /** Stack of current opened pops */
    stack: Collection<PopComponent> = new Collection();
    /** Listens for escape keys and hides latest pop + removes the pop from stack */
    constructor() {
        window.addEventListener('keydown', (event) => {
            if ((event.keyCode === 27 || event.key === 'Escape') && this.stack.items.length) {
                const latestPop = this.stack.items[this.stack.items.length - 1];
                latestPop.hide();
                this.stack.remove(latestPop);
            }
        });
    }
}
