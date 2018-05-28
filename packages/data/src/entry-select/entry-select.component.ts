/**
 * Created by felix on 23.05.17.
 */
import { Component, Input, OnChanges, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Form } from '@ec.components/core';
import { Item } from '@ec.components/core/src/item/item';
import { SelectComponent } from '@ec.components/ui';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { AuthService } from '../auth/auth.service';
import { CrudConfig } from '../crud/crud-config.interface';
import { EntryPopComponent } from '../entry-pop/entry-pop.component';
import { ModelConfigService } from '../model-config/model-config.service';

// import LiteEntryResource from "ec.sdk/lib/resources/publicAPI/LiteEntryResource";

/** Shows entries of a selection and is able to pick new ones from a crud list
 * <example-url>https://components.entrecode.de/data/entry-select</example-url>
*/
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
  /** The config that is being generated. */
  public config: CrudConfig<EntryResource>;
  /** The config for the dropdown crud list */
  public dropdownConfig: CrudConfig<EntryResource>;
  /** Wether or not the selection should be solo */
  @Input() solo: boolean;
  /** The config that should be merged into the generated config */
  // tslint:disable-next-line:no-input-rename
  @Input('config') crudConfig: CrudConfig<EntryResource>;
  /** The dropdown pop with the list to select from */
  @ViewChild('dropdown') pop: PopComponent;
  /** The nested entry pop */
  @ViewChild(EntryPopComponent) entryPop: EntryPopComponent;

  constructor(private modelConfig: ModelConfigService,
    private auth: AuthService) {
    super();
    // TODO: listen to change events and remove deleted selected items
    /* this.resourceService.change({ relation: this.model })
      .subscribe((update) => {
        this.list.load();
      }); */
  }

  /** Calls super.useConfig and then creates special dropdownConfig with just entryTitle as field  */
  useConfig(config: CrudConfig<EntryResource> = {}) {
    super.useConfig(config);
    this.dropdownConfig = Object.assign({}, this.config, {
      fields: {
        [this.config.label]: Object.assign({}, (this.config.fields || {})[this.config.label]),
        _modified: { hidden: true }
      }
    });
    this.auth.getAllowedModelMethods(this.model, this.config.methods)
      .then((methods) => {
        this.config.methods = methods
      });
  }

  /** Returns true if the given method is part of the methods array (or if there is no methods array) */
  public hasMethod(method: string) {
    return this.config && this.config.methods && this.config.methods.indexOf(method) !== -1;
  }

  /** Generates the config and sets up form control */
  ngOnChanges() {
    if (!this.formControl) {
      this.formControl = new FormControl(this.value || []);
    }
    if (this.config) {
      this.useConfig(this.config);
      return;
    }
    this.modelConfig.generateConfig(this.model) // , (this.config || {}).fields
      .then((config) => {
        this.config = Object.assign(config, { size: 10 }, this.crudConfig,
          { solo: this.solo, selectMode: true, disableSelectSwitch: true });
        this.useConfig(this.config);
      });
  }

  /** Is called when a selected item has been clicked. */
  editItem(item: Item<EntryResource>, e) {
    if (!this.hasMethod('put')) {
      return;
    }
    item.getBody().resolve()
      .then(entry => {
        this.entryPop.edit(entry);
      });
    this.clickInside(e);
  }

  /** Returns the pop class that should be used, either uses config.popClass or defaults to ec-pop_dialog. */
  getPopClass() {
    return this.config && this.config.popClass ? this.config.popClass : 'ec-pop_dialog';
  }
  /** Is called when the nested entry-form has been saved. Selects the fresh entry and clears the form */
  formSubmitted(form: Form<EntryResource>) {
    if (!this.selection.has(form)) {
      this.select(form);
    } else { // already in selection => update body
      const index = this.selection.index(form);
      this.selection.items[index].body = form.getBody();
    }
  }
}
