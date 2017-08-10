import { Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PopComponent } from '../pop/pop.component';
import { FormComponent } from '../form/form.component';
import { List } from '../../core/list/list';
import { ListComponent } from '../list/list.component';
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
  /** You can also just pass in the entire parent list component */
  @Input() host: ListComponent;
  /** The pop dropdowns that contain the filtering */
  @ViewChildren('filterPop') pops: QueryList<PopComponent>;
  @ViewChild('filterForm') filter: FormComponent;

  private ngOnChanges() {
    if (this.host) {
      this.list = this.host.list;
      this.selection = this.host.selection;
    }
  }

  private editFilter(pop) {
    pop.toggle();
    this.pops.forEach((pop) => pop.hide());
  }

  private applyFilter(property, value) {
    console.log('apply filter', property, value);
    //TODO
    this.list.filterProperty(property, value);
    /*const filter = {};
    filter[property] = this.filter.getValue()[property];
    pop.hide();
    console.log('filter', filter);
    this.list.applyFilter(filter);*/
  }

  private hasFilter(property) {
    return false;
  }
}
