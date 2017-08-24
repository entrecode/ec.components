/**
 * Created by felix on 23.05.17.
 */
import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { DefaultInputComponent } from '../../ui/form/default-input/default-input.component';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field } from '../../core/field/field';
import { Selection } from '../../core/selection/selection';
import { ListConfig } from '../../core/list/list-config.interface';
import { Item } from '../../core/item/item';

/** Shows assets of a selection and is able to pick new ones from a crud list */
@Component({
  selector: 'ec-asset-select',
  templateUrl: './asset-select.component.html',
  styleUrls: ['./asset-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssetSelectComponent),
      multi: true
    }
  ]
})
export class AssetSelectComponent extends DefaultInputComponent implements ControlValueAccessor {
  /** The formControl that is used. */
  @Input() formControl: FormControl;
  /** The value that should be prefilled */
  @Input() value: Array<any>;
  /** The used field, which should contain a model property (when not using model input) */
  @Input() field: Field<any>;
  /** The used item */
  @Input() item: Item<any>;
  /** The model to pick from, alternative to field with model property set. */
  @Input() model: string;
  /** The config that is being generated. */
  private config: ListConfig;
  /** Wether or not the selection should be solo */
  @Input() solo: boolean;
  /** The current selection */
  private selection: Selection<any>;

  /** The crud pop with the list to select from */
  // @ViewChild('crudPop') pop: PopComponent;

  ngOnInit() {
    if (!this.formControl) {
      this.formControl = new FormControl(this.value || []);
    }
    if (this.field) {
      this.model = this.model || this.field['model'];
    }
    /*this.modelConfig.generateConfig(this.model)
    .then((config) => {
      this.config = Object.assign(config, { size: 10 }, this.crudConfig, { solo: this.solo });
    })*/
  }

  select(item: Item<any>) {
    this.selection.toggle(item);
    if (this.config.solo) {
      // this.pop.toggle(false);
    }
  }

  toggle(selection: Selection<any>) {
    // this.pop.toggle();
    if (!this.selection) {
      Object.assign(this.config, { selection });
      this.selection = selection;
      this.selection.update$.subscribe((selection: Selection<any>) => {
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