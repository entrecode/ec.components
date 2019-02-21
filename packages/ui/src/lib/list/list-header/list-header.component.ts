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
  /** The form that holds the current filter information */
  @ViewChild('filterForm') filter: FormComponent<any>;
  /** The config for the filter form */
  filterFormConfig: ListConfig<any>;
  filteredField: any;

  constructor(public listConfig: ListConfigService) {
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
          [property]: fieldConfig[property]
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
      this.removeFilter(this.filteredField.property);
      if (this.filteredField.property === field.property) {
        pop.hide();
        return;
      }
    }
    if (!field) {
      return;
    }
    field.nestedCrudConfig = {
      ...field.nestedCrudConfig,
      methods: ['get'],
    };
    field.config = {
      ...field.config,
      required: false,
      readOnly: true
    };
    this.filteredField = field;
    pop.show();
  }

  toggledFilterPop(active) {
    if (!active) {
      this.removeFilter(this.filteredField.property);
      delete this.filteredField;
    }
  }

  /** Resets the fields filter */
  public removeFilter(property) {
    const control = this.filter.group.get(property);
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
