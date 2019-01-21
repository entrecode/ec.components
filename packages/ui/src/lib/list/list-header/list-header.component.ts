import { Component, Input, QueryList, ViewChild, ViewChildren, ChangeDetectionStrategy } from '@angular/core';
import { PopComponent } from '../../pop/pop.component';
import { FormComponent } from '../../form/form.component';
import { List } from '@ec.components/core';
import { Selection } from '@ec.components/core';
import { Field } from '@ec.components/core';
import { ListConfigService } from '../list-config.service';

/** This component renders, as the name states, the header of a list.*/
@Component({
  selector: 'ec-list-header',
  templateUrl: './list-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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

  constructor(public listConfig: ListConfigService) {
  }

  /** opens the given filter pop and closes all others */
  public editFilter(pop) {
    pop.toggle();
  }

  /** Applies the given filter to the list. */
  public applyFilter(property, value) {
    this.list.filter(property, value);
  }

  /** Resets the fields filter */
  public removeFilter(property, control) {
    control.reset();
  }

  /** Returns the fields label */
  public fieldLabel(field: Field) {
    if (field.label === false) {
      return '';
    }
    return field.label || field.property;
  }

  /** Toggles the fields visibility in the list */
  public toggleVisibility(field: Field) {
    this.list.toggleVisibility(field);
    this.listConfig.storeConfig(this.list);
  }
}
