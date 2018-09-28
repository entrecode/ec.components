import { Component, Input, OnInit, ElementRef, OnChanges } from '@angular/core';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { PopService } from '@ec.components/ui/src/pop/pop.service';

@Component({
    selector: 'ec-modal',
    templateUrl: './modal.component.html'
})

export class ModalComponent extends PopComponent implements OnInit, OnChanges {
    types = [
        'dialog',
        'overlay',
        'deck',
        'toast',
        'snackbar'
    ];
    /** Set host class to make sure the type is used */
    @Input() mode: string;
    @Input() backdrop = false;
    @Input() columns: number | string;
    classes: string;
    constructor(public popService: PopService, public elementRef: ElementRef) {
        super(popService);
    }

    initMode() {
        this.mode = this.mode || 'dialog';
        this.type = this.mode.split(' ')[0];
        if (!this.types.includes(this.type)) {
            const fallback = this.mode.replace(this.type, 'dialog');
            console.warn(`ec-modal does not support the mode "${this.type}".
            Use one of ${this.types.join(', ')}.
            Falling back to ${fallback}.`);
            this.type = fallback;
        }
        this.classes = this.mode.split(' ').splice(1).join(' ');
        this.types.forEach(type => {
            this.elementRef.nativeElement.classList.remove(`${type}-wrapper`);
        })
        if (this.backdrop) {
            this.elementRef.nativeElement.classList.add(`${this.type}-wrapper`);
        }
    }

    ngOnInit() {
        this.initMode();
    }

    ngOnChanges() {
        this.initMode();
    }
}
