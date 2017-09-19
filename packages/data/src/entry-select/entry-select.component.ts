/**
 * Created by felix on 23.05.17.
 */
import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field } from '@ec.components/core/src/field/field';
import { CrudComponent } from '../crud/crud.component';
import { ModelConfigService } from '../model-config/model-config.service';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { Item } from '@ec.components/core/src/item/item';
import { CrudConfig } from '../crud/crud-config.interface';
import { SelectComponent } from '@ec.components/ui';
import EntryResource from 'ec.sdk/src/resources/publicAPI/EntryResource';

// import LiteEntryResource from "ec.sdk/src/resources/publicAPI/LiteEntryResource";

/** Shows entries of a selection and is able to pick new ones from a crud list */
@Component({
  selector: 'ec-entry-select',
  templateUrl: './entry-select.component.html',
  styleUrls: ['../../../ui/src/select/select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntrySelectComponent),
      multi: true
    }
  ]
})
export class EntrySelectComponent extends SelectComponent<EntryResource> implements OnChanges {
  /** The field for which the input is meant. */
  @Input() field: Field<any>;
  /** The item that is targeted by the input */
  protected item: Item<any>;
  /** The form group that is used */
  protected group: FormGroup;
  /** The form control that is used */
  protected control: FormControl;
  /** The formControl that is used. */
  @Input() formControl: FormControl;
  /** The value that should be prefilled */
  @Input() value: Array<EntryResource>;
  /** The model to pick from, alternative to field with model property set. */
  @Input() model: string;
  /** The ec-crud inside the view template */
  @ViewChild('crud') crud: CrudComponent<EntryResource>;
  /** The config that is being generated. */
  public config: CrudConfig<EntryResource>;
  /** Wether or not the selection should be solo */
  @Input() solo: boolean;
  /** The config that should be merged into the generated config */
  @Input('config') crudConfig: CrudConfig<EntryResource>;
  /** The crud pop with the list to select from */
  @ViewChild('crudPop') pop: PopComponent;

  constructor(private modelConfig: ModelConfigService) {
    super();
  }

  ngOnChanges() {
    if (!this.formControl) {
      this.formControl = new FormControl(this.value || []);
    }
    if (this.field) {
      this.model = this.model || this.field['model'];
    }
    if (this.config) {
      super.useConfig(this.config);
      return;
    }
    this.modelConfig.generateConfig(this.model) // , (this.config || {}).fields
    .then((config) => {
      this.config = Object.assign(config, { size: 10 }, this.crudConfig, { solo: this.solo });
      this.useConfig(this.config);
    });
  }

  /** Is called when a selected item has been clicked. */
  editItem(item) {
    if (item.getBody() instanceof EntryResource) {
      console.log('already got full entry', item.getBody());
      return;
    }
    item.getBody().resolve().then((entry) => {
      console.log('resolved', entry);
    });
    // TODO open edit pop
  }
}
