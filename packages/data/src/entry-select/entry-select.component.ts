/**
 * Created by felix on 23.05.17.
 */
import { Component, forwardRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Form } from '../../../core';
import { Item } from '../../../core/src/item/item';
import { ResourceService } from '../resource-config/resource.service';
import { SdkService } from '../sdk/sdk.service';
import { SelectComponent } from '../../../ui';
import { PopComponent } from '../../../ui/src/pop/pop.component';
import { SymbolService } from '../../../ui/src/symbol/symbol.service';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import 'rxjs/add/operator/debounceTime';
import { SearchbarComponent } from '../../../ui/src/list/searchbar/searchbar.component';
import { AuthService } from '../auth/auth.service';
import { CrudConfig } from '../crud/crud-config.interface';
import { EntryListPopComponent } from '../entry-list-pop/entry-list-pop.component';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { EntryPopComponent } from '../entry-pop/entry-pop.component';
import { ModelConfigService } from '../model-config/model-config.service';
import { ResourceDeletePopComponent } from '../resource-delete-pop/resource-delete-pop.component';

// import LiteEntryResource from "ec.sdk/lib/resources/publicAPI/LiteEntryResource";

/** Shows entries of a selection and is able to pick new ones from a crud list
 * <example-url>https://components.entrecode.de/data/entry-select?e=1</example-url>
*/
@Component({
  selector: 'ec-entry-select',
  templateUrl: './entry-select.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntrySelectComponent),
      multi: true
    }
  ]
})
export class EntrySelectComponent extends SelectComponent<EntryResource> implements OnChanges, OnInit {
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
  /** The nested entry list pop */
  @ViewChild(EntryListPopComponent) entryListPop: EntryListPopComponent;
  /** The nested full EntryListComponent */
  @ViewChild('entryList') entryList: EntryListComponent;
  /** The nested searchbar */
  @ViewChild(SearchbarComponent) searchbar: SearchbarComponent;
  /** THe nested delete confirmation pop */
  @ViewChild(ResourceDeletePopComponent) confirmDelete: ResourceDeletePopComponent;
  /** The current lightModel (part of root response) */
  lightModel: any;
  /** Model list that is only loaded when needing to pick the model first. */
  models;

  constructor(private modelConfig: ModelConfigService,
    public resourceService: ResourceService,
    public symbol: SymbolService,
    public sdk: SdkService,
    public elementRef: ElementRef,
    private auth: AuthService) {
    super(elementRef);
  }

  removeItem(item, skipDelete, e?) {
    super.removeItem(item, e);
    if (!skipDelete && this.config.deleteOnRemove) {
      if (this.config.safeDelete) {
        this.confirmDelete.confirm(item.getBody());
      } else {
        item.getBody().delete();
      }
    }
  }

  activate($event) {
    if (this.pop && !this.config.disableSelect) {
      this.pop.toggle();
    } else if (this.entryListPop && !this.config.disableListPop) {
      this.entryListPop.show();
    } else if (this.entryPop && !this.config.disableCreatePop) {
      this.entryPop.show();
    }
  }

  defaultPlaceholder() {
    if (this.config.disableSelect && this.config.disableListPop) {
      return this.symbol.resolve('entry.select.placeholder.new');
    }
    return this.symbol.resolve('entry.select.placeholder.select');
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

  useModel(model) {
    this.model = model;
    this.initConfig();
  }

  /** Generates the config and sets up form control */
  initConfig() {
    if (!this.formControl) {
      this.formControl = new FormControl(this.value || []);
    }
    if (this.config) {
      this.useConfig(this.config);
      return;
    }
    if (!this.model && this.sdk.api) {
      this.sdk.api.modelList().then(modelList => {
        this.models = Object.keys(modelList).map(model => modelList[model]);
      });
      return;
    }
    this.modelConfig.getLightModel(this.model)
      .then(model => this.lightModel = model);

    this.modelConfig.generateConfig(this.model) // , (this.config || {}).fields
      .then((config) => {
        this.config = Object.assign(config, { size: 10 }, this.crudConfig,
          { solo: this.solo, selectMode: true, disableSelectSwitch: true });
        this.useConfig(this.config);
      });
  }

  /** Fires initConfig */
  ngOnInit() {
    this.initConfig();
  }

  /** Fires initConfig */
  ngOnChanges() {
    this.initConfig();
  }

  /** Is called when a selected item has been clicked. */
  editItem(item: Item<EntryResource>, e) {
    if (!this.hasMethod('put')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    item.getBody().resolve()
      .then(entry => {
        this.entryPop.edit(entry);
      });
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
