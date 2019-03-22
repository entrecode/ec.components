import { Component, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Field, Item } from '@ec.components/core';
import { Focus } from '../../utility/focus/focus.interface';

/** This component holds the templates for all basic field types. */
@Component({
  templateUrl: './default-input.component.html',
})
export class DefaultInputComponent implements AfterViewInit, Focus {
  /** The field for which the input is meant. */
  public field: Field;
  /** The item that is targeted by the input */
  public item: Item<any>;
  /** The form group that is used */
  public group: FormGroup;
  /** The form control that is used */
  public control: FormControl;
  /** Emitter to focus the input field */
  focusEvent: EventEmitter<boolean> = new EventEmitter();

  ngAfterViewInit() {
    if (this.field && this.field.autofocus) {
      this.focus();
    }
  }

  focus(focus = true) {
    setTimeout(() => {
      this.focusEvent.emit(focus);
    }, 100);
  }
}
