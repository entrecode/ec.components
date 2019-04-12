import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Field, List, ListConfig, Selection } from '@ec.components/core';
import { FormComponent } from '../../form/form.component';
import { PopComponent } from '../../pop/pop.component';
import { ListConfigService } from '../list-config.service';
import { InputComponent } from '../../io/input/input.component';

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
  @ViewChild('filterPop') filterPop: PopComponent;
  /** The config for the filter form */
  filterFormConfig: ListConfig<any>;
  filteredField: any;
  filterForm: FormComponent<any>;
  filterInput: InputComponent;

  constructor(public listConfig: ListConfigService, public cdr: ChangeDetectorRef) {
  }

  setFilter(field, value) {
    this.list.setFilter({ [field.property]: value });
  }

  inputReady(input) {
    this.filterInput = input;
    input.focus(true);
  }

  initFilterForm(filterForm) {
    // is called when form is ready
    this.filterForm = filterForm;
    if (this.list.config.defaultFilter) {
      this.filterField(this.list.config.defaultFilter);
    }
  }

  ngOnChanges(changes?) {
    if (!changes.list) {
      return;
    }
    if (!this.list || !this.list.config || !this.list.config.fields) {
      return;
    }
    /* this.list.change$.subscribe(() => {
      if (this.filterInput) {
        // this.filterInput.focus(true);
      }
    }); */
    this.filterFormConfig = {
      ...this.list.config,
      fields: this.list.filterableFields().reduce((fields, field) => {
        return {
          ...fields,
          [field.property]: {
            ...this.list.config.fields[field.property],
            view: field.getView('filter'),
            required: false,
            readOnly: false,
            immutable: false,
            create: true,
            form: true,
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
  public filterField(property) {
    if (this.filteredField) {
      if (this.filteredField.property === property) {
        /* this.filterPop.hide(); */
        if (this.filterInput) {
          this.filterInput.focus(true);
        }
        return;
      }
      this.clearFilter();
    }
    // patch current filter value to control
    const control = this.filterForm.group.get(property);
    if (!control) {
      console.warn('no control found for ' + property + '. Is it filterable?', this.list.config, this.filterForm.group);
      return;
    }
    this.filterForm.group.get(property).patchValue(this.list.getFilterValue(property));
    this.filteredField = this.filterForm.form.getField(property);
    setTimeout(() => this.filterPop.show());
  }

  resetFilter() {
    if (!this.filteredField || !this.list || !this.list.isFiltered(this.filteredField.property)) {
      return;
    }
    this.filterForm.group.get(this.filteredField.property).reset();
    this.list.clearFilter();
  }

  clearFilter() {
    if (!this.filteredField || !this.list.isFiltered(this.filteredField.property)) {
      delete this.filteredField;
      return;
    }
    this.resetFilter();
    delete this.filteredField;
  }

  toggledFilterPop(active) {
    if (!active) {
      this.clearFilter();
    }
    if (this.filterInput) {
      this.filterInput.focus(true);
    }
  }

  /** Toggles the fields visibility in the list */
  public toggleVisibility(field: Field) {
    this.list.toggleVisibility(field);
    this.listConfig.storeConfig(this.list);
  }
}
