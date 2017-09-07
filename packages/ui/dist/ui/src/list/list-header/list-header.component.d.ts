import { QueryList } from '@angular/core';
import { PopComponent } from '../../pop/pop.component';
import { FormComponent } from '../../form/form.component';
import { List } from '@ec.components/core/src/list/list';
import { Selection } from "../../../../core/src/selection/selection";
/** This component renders, as the name states, the header of a list.*/
export declare class ListHeaderComponent {
    /** The list instance */
    list: List<any>;
    /** The selection instance. This is optional. If It is not provided, no checkbox will be visible.*/
    selection: Selection<any>;
    /** The pop dropdowns that contain the filtering */
    pops: QueryList<PopComponent>;
    /** The form that holds the current filter information */
    filter: FormComponent;
    /** opens the given filter pop and closes all others */
    private editFilter(pop);
    /** Applies the given filter to the list. */
    private applyFilter(property, value);
    private removeFilter(property, control);
}
