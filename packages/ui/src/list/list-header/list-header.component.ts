import { Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PopComponent } from '../../pop/pop.component';
import { FormComponent } from '../../form/form.component';
import { List } from '@ec.components/core/src/list/list';
import { Selection } from '@ec.components/core/src/selection/selection';
import { Field } from '@ec.components/core';

/** This component renders, as the name states, the header of a list.*/
@Component({
  selector: 'ec-list-header',
  templateUrl: './list-header.component.html',
})
export class ListHeaderComponent {
  /** The list instance */
  @Input() list: List<any>;
  /** The selection instance. This is optional. If It is not provided, no checkbox will be visible.*/
  @Input() selection: Selection<any>;
  /** The pop dropdowns that contain the filtering */
  @ViewChildren('filterPop') pops: QueryList<PopComponent>;
  /** The form that holds the current filter information */
  @ViewChild('filterForm') filter: FormComponent<any>;

  /** opens the given filter pop and closes all others */
  public editFilter(pop) {
    pop.toggle();
    // this.pops.forEach((pop) => pop.hide());
  }

  /** Applies the given filter to the list. */
  public applyFilter(property, value) {
    this.list.filter(property, value);
  }

  public removeFilter(property, control) {
    control.reset();
  }

  public fieldLabel(field: Field) {
    if (field.label === false) {
      return '';
    }
    return field.label || field.property;
  }
}
