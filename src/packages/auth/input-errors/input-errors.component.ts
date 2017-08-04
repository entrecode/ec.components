import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { errors } from '../errors';

@Component({
  selector: 'ec-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss']
})
export class InputErrorsComponent implements OnInit {
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
