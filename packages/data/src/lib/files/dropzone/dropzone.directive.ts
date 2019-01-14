import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

/** Directive that turns any element into a zone to drop files. TODO: demo */
@Directive({ selector: '[ecDropzone]' })
export class DropzoneDirective {
    /** The is-active class is bound to the host when dragover is active */
    @HostBinding('class.is-active') public active: boolean;
    /** Emits when files are dropped */
    @Output() ecDropzone: EventEmitter<any> = new EventEmitter();
    /** If true the element acts normal */
    @Input() disabled = false;
    /** flips active to true on dragover */
    @HostListener('dragover', ['$event']) onDragOver(e) {
        if (this.disabled) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (!this.active) {
            this.active = true;
        }
    }
    /** emits dropped files and flips active to false on drop */
    @HostListener('drop', ['$event']) onDrop(e) {
        if (this.disabled) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (!e.dataTransfer.files || !e.dataTransfer.files.length) {
            return;
        }
        this.ecDropzone.emit(e);
        this.active = false;
    }
    /** flips active to false on dragleave */
    @HostListener('dragleave', ['$event']) onDragLeave(e) {
        if (this.disabled) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (this.active) {
            this.active = false;
        }
    }
    constructor(private el: ElementRef) {
    }
}
