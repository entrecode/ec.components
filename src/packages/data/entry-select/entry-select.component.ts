/**
 * Created by felix on 23.05.17.
 */
import { Component, forwardRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { DefaultInputComponent } from '../../ui/form/default-input/default-input.component';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field } from '../../core/field/field';
import { CrudComponent } from '../crud/crud.component';
import { ModelConfigService } from '../model-config/model-config.service';
import { EntryResource } from "ec.sdk/typings/resources/publicAPI/EntryResource";
import { Selection } from '../../core/selection/selection';
import { PopComponent } from '../../ui/pop/pop.component';
import { Item } from '../../core/item/item';
import { CrudConfig } from '../crud/crud-config.interface';

/** Shows entries of a selection and is able to pick new ones from a crud list */
@Component({
  selector: 'ec-entry-select',
  templateUrl: './entry-select.component.html',
  styleUrls: ['./entry-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntrySelectComponent),
      multi: true
    }
  ]
})
export class EntrySelectComponent extends DefaultInputComponent implements ControlValueAccessor {
  /** The formControl that is used. */
  @Input() formControl: FormControl;
  /** The value that should be prefilled */
  @Input() value: Array<EntryResource>;
  /** The used field, which should contain a model property (when not using model input) */
  @Input() field: Field<any>;
  /** The model to pick from, alternative to field with model property set. */
  @Input() model: string;
  /** The ec-crud inside the view template */
  @ViewChild('crud') crud: CrudComponent;
  /** The config that is being generated. */
  private config: CrudConfig;
  /** Wether or not the selection should be solo */
  @Input() solo: boolean;
  /** The config that should be merged into the generated config */
  @Input('config') crudConfig: CrudConfig;
  /** The current selection */
  private selection: Selection<EntryResource>;
  /** The crud pop with the list to select from */
  @ViewChild('crudPop') pop: PopComponent;

  constructor(private modelConfig: ModelConfigService) {
    super();
  }

  /** Is called when a selected item has been clicked. */
  editItem(item) {
    console.log('edit!!! TBD', item); //TODO
  }

  ngOnInit() {
    if (!this.formControl) {
      this.formControl = new FormControl(this.value || []);
    }
    if (this.field) {
      this.model = this.model || this.field['model'];
    }
    this.modelConfig.generateConfig(this.model)
    .then((config) => {
      this.config = Object.assign(config, { size: 10 }, this.crudConfig, { solo: this.solo });
    })
  }

  select(item: Item<EntryResource>) {
    this.selection.toggle(item);
    if (this.config.solo) {
      this.pop.toggle(false);
    }
  }

  toggle(selection: Selection<EntryResource>) {
    this.pop.toggle();
    if (!this.selection) {
      Object.assign(this.config, { selection });
      this.selection = selection;
      this.selection.update$.subscribe((selection: Selection<EntryResource>) => {
        this.propagateChange(selection.getValue());
      });
    }
  }

  /** Returns pop class for entry picker, defaults to no class. */
  getPopClass() {
    return this.config && this.config.nestedPopClass ? this.config.nestedPopClass : '';
  }

  writeValue(value: any) {
  }

  propagateChange = (_: any) => {
  };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {

  }
}