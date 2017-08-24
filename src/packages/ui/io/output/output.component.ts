import { Component, Input } from '@angular/core';
import { DefaultOutputComponent } from '../../form/default-output/default-output.component';
import { DynamicSlotComponent } from '../dynamic-slot/dynamic-slot.component';
import { Field } from '../../../core/field/field';
import { Item } from '../../../core/item/item';

/** Outputs the given field of the given item, rendering the component dynamically. */
@Component({
  selector: 'ec-output',
  templateUrl: '../dynamic-slot/dynamic-slot.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent extends DynamicSlotComponent {
  /** The instance of field that should be used in the template */
  @Input() field: Field<any>;
  /** The belonging item */
  @Input() item: Item<any>;

  /** The component is loade as soon as the field and item are known.
   * If the field has no output property set, the DefaultOutputComponent will be rendered. */
  ngOnChanges() {
    if (this.field && this.item) {
      this.loadComponent(this.field.output || DefaultOutputComponent,
        {
          item: this.item,
          field: this.field
        });
    }
  }
}
