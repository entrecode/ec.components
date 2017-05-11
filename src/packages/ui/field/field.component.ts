import { Component, ContentChild, Host, Input, TemplateRef } from '@angular/core';
import { FieldConfigProperty } from '@ec.components/core';
import { ListComponent } from '../index';
import { Field } from '../../core/field/field';

@Component({
  selector: 'ec-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {
  cell: {
    value: string;
  };
  @Input() field: Field<any>;
  @Input() item: any;
  @Input() config: FieldConfigProperty;
  @Host() list: ListComponent;
  @Input() component: FieldComponent;

  @Input() property: string;
  @Input() type: string;
  @Input() value: any;

  @ContentChild(TemplateRef) template: any;

  constructor() {
  }

  ngAfterContentInit() {
  }

  ngOnInit() {
  }

}
