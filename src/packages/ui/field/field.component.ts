import { Component, Host, Input, OnInit } from '@angular/core';
import { Field, FieldConfigProperty } from '@ec.components/core';
import { ListComponent } from '@ec.components/ui';

@Component({
  selector: 'ec-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  field: Field<any>;

  @Input() item: any;
  @Input() property: string;
  @Input() config: FieldConfigProperty;
  @Host() list: ListComponent;

  @Input() type: string;
  @Input() value: any;
  private validators = {
    text: (v) => typeof v === 'string',
    number: (v) => typeof v === 'number',
    labels: (v) => Array.isArray(v),
  };

  constructor() {
  }

  ngOnInit() {
    if (this.item && this.list) {
      console.log('LISTT', this.list.config);
      console.log('field', this.item);
      this.field = new Field(this.item, {});
    }
    /*if (!this.validators.hasOwnProperty(this.field.config.type) || !this.validators[this.field.config.type]) {
     console.error('type', this.field.config.type, 'cannot be of type', typeof this.field.config.type);
     }*/
  }

  ngOnChange() {
  }

}
