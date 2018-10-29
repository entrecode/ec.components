import { Component, Input, OnInit, ElementRef, OnChanges, TemplateRef, ContentChildren } from '@angular/core';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { PopService } from '@ec.components/ui/src/pop/pop.service';

/**
 * A modal is an extension of a pop. It adds different style options that apply x.ui markup.
 * <example-url>https://components.entrecode.de/ui/modal?e=1</example-url>
 *
 * https://medium.com/claritydesignsystem/ng-content-the-hidden-docs-96a29d70d11b
 */
@Component({
    selector: 'ec-modal',
    templateUrl: './modal.component.html'
})

export class ModalComponent extends PopComponent implements OnInit, OnChanges {
    /** all possible modes that can be set */
    types = [
        'dialog',
        'overlay',
        'deck',
        'toast',
        'snackbar'
    ];
    /** This property sets the mode + additional options.
     * It expects the type at first and non mandatory options like opens-left afterwards. */
    @Input() mode: string;
    /** If true, the modal will have a dark backdrop that disables clicking outside. */
    @Input() backdrop = false;
    /** Sets data-animate. */
    @Input() animation = 'fadeIn 4';
    /** Header Template */
    @Input() header: TemplateRef<any>;
    /** Body Template */
    @Input() body: TemplateRef<any>;
    /** Footer Template */
    @Input() footer: TemplateRef<any>;
    /** Templates for header body and footer */
    @ContentChildren(TemplateRef) templates: TemplateRef<any>[];
    /** Sets data-col. If specified, the width of the modal is fixed to the given value (1-12). */
    @Input() columns: number | string;
    /** Will contain the classes (mode - type) */
    private classes: string;
    /** Constructs the modal, injects pop service */
    constructor(
        public popService: PopService,
        public elementRef: ElementRef) {
        super(popService, elementRef);
    }
    /** Is called on init and change. Parses mode input and throws warning if type is not supported. */
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

    /** calls initMode */
    ngOnInit() {
        this.initMode();
    }
    /** calls initMode */
    ngOnChanges() {
        this.initMode();
    }
}
