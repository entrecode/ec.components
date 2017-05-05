import { Component, Input } from '@angular/core';
import { List } from '@ec.components/core/list/list';
import { Selection } from '@ec.components/core/selection/selection';
import { ListComponent } from '../list.component';

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

  private ngOnChanges() {
    if (this.host) {
      this.list = this.host.list;
      this.selection = this.host.selection;
    }
  }
}
