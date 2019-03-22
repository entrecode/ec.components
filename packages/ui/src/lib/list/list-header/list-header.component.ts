import { Component, Input, QueryList, ViewChild, ViewChildren, ChangeDetectionStrategy, OnInit, OnChanges } from '@angular/core';
import { PopComponent } from '../../pop/pop.component';
import { FormComponent } from '../../form/form.component';
import { List, ListConfig } from '@ec.components/core';
import { Selection } from '@ec.components/core';
import { Field } from '@ec.components/core';
import { ListConfigService } from '../list-config.service';

/** This component renders, as the name states, the header of a list.*/
@Component({
  selector: 'ec-list-header',
  templateUrl: './list-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListHeaderComponent implements OnChanges {
  /** The list instance */
  @Input() list: List<any>;
  /** The selection instance. This is optional. If It is not provided, no checkbox will be visible.*/
  @Input() selection: Selection<any>;
  /** The pop dropdowns that contain the filtering */
  @ViewChildren('filterPop') pops: QueryList<PopComponent>;
  /** The config for the filter form */
  filterFormConfig: ListConfig<any>;
  filteredField: any;
  filterForm: FormComponent<any>;

  constructor(public listConfig: ListConfigService) {
  }

  setFilter(field, value) {
    this.list.setFilter({ [field.property]: value });
  }

  initFilterForm(filterForm) {
    // is called when form is ready
    this.filterForm = filterForm;
  }

  ngOnChanges(changes?) {
    if (!changes.list) {
      return;
    }
    if (!this.list || !this.list.config || !this.list.config.fields) {
      return;
    }
    this.filterFormConfig = {
      ...this.list.config,
      fields: this.list.filterableFields().reduce((fields, field) => {
        return {
          ...fields,
          [field.property]: {
            ...this.list.config.fields[field.property],
            required: false,
            readOnly: false,
            autofocus: true,
            nestedCrudConfig: {
              ...field.nestedCrudConfig,
              methods: ['get'],
            },
          }
        };
      }, {})
    };
  }

  /** opens the given filter pop and closes all others */
  public editFilter(pop, property) {
    if (this.filteredField) {
      if (this.filteredField.property === property) {
        pop.hide();
        return;
      }
      this.clearFilter();
    }
    // patch current filter value to control
    this.filterForm.group.get(property).patchValue(this.list.getFilterValue(property));
    this.filteredField = this.filterForm.form.getField(property);
    pop.show();
  }

  clearFilter() {
    if (!this.filteredField || !this.list.isFiltered(this.filteredField.property)) {
      delete this.filteredField;
      return;
    }
    this.filterForm.group.get(this.filteredField.property).reset();
    this.list.clearFilter();
    delete this.filteredField;
  }

  toggledFilterPop(active) {
    if (!active) {
      this.clearFilter();
    }
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
