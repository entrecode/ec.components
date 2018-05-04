import { Directive, EventEmitter, HostListener, Output, HostBinding, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[ecDropzone]' })
export class DropzoneDirective {
    @HostBinding('class.is-active') private active: boolean;
    @Output() ecDropzone: EventEmitter<any> = new EventEmitter();
    @Input() disabled = false;
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
