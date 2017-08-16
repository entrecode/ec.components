import { Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PopComponent } from '../pop/pop.component';
import { FormComponent } from '../form/form.component';
import { List } from '../../core/list/list';
import { Selection } from "../../core/selection/selection";

/** This component renders, as the name states, the header of a list.*/
@Component({
  selector: 'ec-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent {
  /** The list instance */
  @Input() list: List<any>;
  /** The selection instance. This is optional. If It is not provided, no checkbox will be visible.*/
  @Input() selection: Selection<any>;
  /** The pop dropdowns that contain the filtering */
  @ViewChildren('filterPop') pops: QueryList<PopComponent>;
  /** The form that holds the current filter information */
  @ViewChild('filterForm') filter: FormComponent;
  /** Contains the current property that has been filtered. */
  currentFilterProperty: string;

  /** opens the given filter pop and closes all others */
  private editFilter(pop) {
    pop.toggle();
    // this.pops.forEach((pop) => pop.hide());
  }

  /** Applies the given filter to the list. */
  private applyFilter(property, value) {
    this.currentFilterProperty = property;
    this.list.filter(property, value);
  }

  private removeFilter(property) {
    delete this.currentFilterProperty;
    this.list.filter(property, '');
  }

  /** Returns true if the property is currently filtered. */
  private hasFilter(property) {
    //TODO find better way
    return property === this.currentFilterProperty;
  }
}
