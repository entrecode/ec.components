import { Injectable } from '@angular/core';
import { PopComponent } from '@ec.components/ui';
import { Collection } from '@ec.components/core';

@Injectable()
export class PopService {
    stack: Collection<PopComponent> = new Collection();
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
