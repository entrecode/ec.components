import { Directive, ElementRef, EventEmitter, Input, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ecFocus]',
})
export class FocusDirective implements OnInit {
  @Input() ecFocus: EventEmitter<boolean>;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.ecFocus
      .subscribe((event: boolean) => {
        if (event) {
          this.element.nativeElement.focus();
        } else {
          this.element.nativeElement.blur();
        }
      });
  }
}
