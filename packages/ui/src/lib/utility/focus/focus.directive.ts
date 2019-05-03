import { Directive, ElementRef, EventEmitter, Input, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ecFocus]',
})
export class FocusDirective implements OnInit, AfterViewInit {
  @Input() ecFocus: EventEmitter<boolean>;
  @Input() autofocus: boolean;

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    if (this.autofocus) {
      this.ecFocus.emit(true);
    }
  }

  ngOnInit() {
    this.ecFocus.subscribe((event: boolean) => {
      if (event) {
        this.element.nativeElement.focus();
      } else {
        this.element.nativeElement.blur();
      }
    });
  }
}
