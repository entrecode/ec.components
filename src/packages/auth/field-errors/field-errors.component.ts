import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { errors } from '../errors';

@Component({
  selector: 'ec-field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.scss']
})
export class FieldErrorsComponent implements OnInit {
  @Input() control: FormControl;
  private errors;

  constructor() {
    this.errors = errors;
  }

  ngOnInit() {
  }

  getErrors() {
    return Object.keys(this.control.errors).reduce((errors, key) => {
      errors.push({
        key: key,
        error: this.control.errors[key]
      });
      return errors;
    }, []);
  }

}
