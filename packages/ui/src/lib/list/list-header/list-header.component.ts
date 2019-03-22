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
    const fieldConfig = this.list.config.fields;
    const filterableFields = Object.keys(fieldConfig).reduce((fields, property) => {
      if (fieldConfig[property].filterable) {
        return {
          ...fields,
          [property]: {
            ...fieldConfig[property],
            required: false,
            readOnly: false,
            autofocus: true
          }
        };
      }
      return fields;
    }, {});

    this.filterFormConfig = {
      ...this.list.config,
      fields: filterableFields
    };
  }

  /** opens the given filter pop and closes all others */
  public editFilter(pop, field) {
    if (this.filteredField) {
      if (this.filteredField.property === field.property) {
        pop.hide();
        return;
      }
      this.clearFilter();
    }
    if (!field) {
      return;
    }
    field.autofocus = true;
    field.nestedCrudConfig = {
      ...field.nestedCrudConfig,
      methods: ['get'],
    };
    // patch current filter value to control
    this.filterForm.group.get(field.property).patchValue(this.list.getFilterValue(field.property));
    this.filteredField = field;
    pop.show();
  }

  clearFilter() {
    if (!this.filteredField || !this.list.isFiltered(this.filteredField.property)) {
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
