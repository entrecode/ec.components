/**
 * Created by felix on 23.05.17.
 */
import { Component, forwardRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { DefaultInputComponent } from '../../ui/input/default-input.component';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field } from '../../core/field/field';
import { CrudComponent } from '../crud/crud.component';
import { ModelConfigService } from '../model-config/model-config.service';
import { EntryResource } from "ec.sdk/typings/resources/publicAPI/EntryResource";
import { Selection } from '../../core/selection/selection';
import { ListConfig } from '../../core/list/list-config.interface';
import { PopComponent } from '../../ui/pop/pop.component';
import { Item } from '../../core/item/item';
import { CrudConfig } from '../crud/crud-config.interface';

/** Loads an entry by id to the template. */
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
  /** The used field */
  @Input() field: Field<any>;
  /** The used field */
  @ViewChild('crud') crud: CrudComponent;
  /** The config that is being generated. */
  private config: ListConfig;
  /** Wether or not the selection should be solo */
  @Input() solo: boolean;
  /** The config that should be merged into the generated config */
  @Input('config') crudConfig: CrudConfig;
  /** The current selection */
  private selection: Selection<EntryResource>;
  /** The crud pop with the list to select from */
  @ViewChild('crudPop') pop: PopComponent;

  constructor(private modelConfig: ModelConfigService) {
    super()
  }

  ngOnInit() {
    if (this.field) {
      this.modelConfig.generateConfig(this.field['model'])
      .then((config) => {
        this.config = Object.assign(config, { size: 10 }, this.crudConfig, { solo: this.solo });
      })
    }
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