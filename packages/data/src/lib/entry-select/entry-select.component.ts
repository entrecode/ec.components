/**
 * Created by felix on 23.05.17.
 */
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Form, Item } from '@ec.components/core';
import { PopComponent, SearchbarComponent, SelectComponent, SymbolService } from '@ec.components/ui';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { AuthService } from '../auth/auth.service';
import { CrudConfig } from '../crud/crud-config.interface';
import { EntryListPopComponent } from '../entry-list-pop/entry-list-pop.component';
import { EntryPopComponent } from '../entry-pop/entry-pop.component';
import { ModelConfigService } from '../model-config/model-config.service';
import { ResourceService } from '../resource-config/resource.service';
import { ResourceDeletePopComponent } from '../resource-delete-pop/resource-delete-pop.component';
import { SdkService } from '../sdk/sdk.service';

// import LiteEntryResource from "ec.sdk/lib/resources/publicAPI/LiteEntryResource";

/** Shows entries of a selection and is able to pick new ones from a crud list
 * <example-url>https://components.entrecode.de/entries/entry-select?e=1</example-url>
 */
@Component({
  selector: 'ec-entry-select',
  templateUrl: './entry-select.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntrySelectComponent),
      multi: true,
    },
  ],
})
export class EntrySelectComponent extends SelectComponent<EntryResource> implements OnChanges, OnInit {
  /** The item that is targeted by the input */
  protected item: Item<any>;
  /** The form group that is used */
  protected group: FormGroup;
  /** The form control that is used */
  protected control: FormControl;
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
  /** The event that focuses the input */
  @Input() focusEvent: EventEmitter<boolean> = new EventEmitter();
  /** The config that should be merged into the generated config */
  // tslint:disable-next-line:no-input-rename
  @Input('config') crudConfig: CrudConfig<EntryResource>;
  /** The dropdown pop with the list to select from */
  @ViewChild('dropdown') dropdown: PopComponent;
  /** The nested entry pop */
  @ViewChild(EntryPopComponent) entryPop: EntryPopComponent;
  /** The nested entry list pop */
  @ViewChild(EntryListPopComponent, { static: true }) entryListPop: EntryListPopComponent;
  /** The nested full EntryListComponent */
  @ViewChild('dropdownList') dropdownList: any;
  /** The nested searchbar */
  @ViewChild(SearchbarComponent) searchbar: SearchbarComponent;
  /** THe nested delete confirmation pop */
  @ViewChild(ResourceDeletePopComponent, { static: true }) confirmDelete: ResourceDeletePopComponent;
  /** Emits when an entry is being removed */
  @Output() remove: EventEmitter<Item<EntryResource>> = new EventEmitter();
  /** Emits when an entry is being added */
  @Output() add: EventEmitter<Item<EntryResource>> = new EventEmitter();
  /** The current lightModel (part of root response) */
  lightModel: any;
  /** Model list that is only loaded when needing to pick the model first. */
  models;
  /** Promise that resolves when the config is ready */
  ready: Promise<CrudConfig<EntryResource>>;

  constructor(
    private modelConfig: ModelConfigService,
    public resourceService: ResourceService,
    public symbol: SymbolService,
    public sdk: SdkService,
    public elementRef: ElementRef,
    private auth: AuthService,
    public cdr: ChangeDetectorRef,
  ) {
    super(elementRef, cdr);
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
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  togglePop(e?, noFocus = false) {
    if (this.disabled) {
      if (!this.selection.isEmpty()) {
        this.editItem(this.selection.display[0], e);
      }
      return;
    }
    this.ready.then(() => {
      if (this.dropdown) {
        this.dropdown.show(e);
      } else if (this.entryListPop && !this.config.disableListPop) {
        this.entryListPop.show(e);
      } else if (this.entryPop && !this.config.disableCreatePop) {
        this.entryPop.show();
      }
      if (this.searchbar && !noFocus) {
        this.focusEvent.emit(true);
      }
    });
  }

  defaultPlaceholder() {
    if (this.config && this.config.disableSearchbar && this.config.disableListPop) {
      return this.symbol.resolve('entry.select.placeholder.new');
    }
    return this.symbol.resolve('entry.select.placeholder.select');
  }

  /** Calls super.useConfig and then creates special dropdownConfig with just entryTitle as field  */
  useConfig(config: CrudConfig<EntryResource> = {}): Promise<CrudConfig<EntryResource>> {
    super.useConfig(config);
    this.dropdownConfig = Object.assign({}, this.config, {
      disableHeader: true,
      fields: this.config.dropdownFields || {
        [this.config.label]: Object.assign({}, (this.config.fields || {})[this.config.label]),
        _modified: { hideInList: true },
      },
    });
    return this.auth.getAllowedModelMethods(this.model, this.config.methods).then((methods) => {
      this.cdr.markForCheck();
      this.config.methods = methods;
      return this.config;
    });
  }

  /** Returns true if the given method is part of the methods array (or if there is no methods array) */
  public hasMethod(method: string) {
    return this.config && this.config.methods && this.config.methods.indexOf(method) !== -1;
  }

  useModel(model) {
    this.model = model;
    this.modelConfig.getLightModel(model).then((lightModel) => (this.lightModel = lightModel));
    this.initConfig();
  }

  /** Generates the config and sets up form control */
  initConfig() {
    if (!this.formControl) {
      this.formControl = new FormControl(this.value || []);
    }
    if (this.config) {
      this.ready = this.useConfig(this.config);
      return;
    }
    if (!this.model && this.sdk.api) {
      this.sdk.api.modelList().then((modelList) => {
        this.models = Object.keys(modelList).map((model) => modelList[model]);
      });
      return;
    }
    this.modelConfig.getLightModel(this.model).then((model) => (this.lightModel = model));

    this.ready = this.modelConfig
      .generateConfig(this.model) // , (this.config || {}).fields
      .then((config) => {
        this.config = Object.assign(config, this.crudConfig, {
          solo: this.solo,
          selectMode: false,
          disableSelectSwitch: true,
        });
        return this.useConfig(this.config);
      });
  }

  /** Fires initConfig */
  ngOnInit() {
    this.initConfig();
    this.focusEvent.subscribe((focus) => {
      if (focus) {
        this.togglePop(null, true);
      }
    });
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
    item
      .getBody()
      .resolve()
      .then((entry) => {
        this.entryPop.edit(entry);
      });
  }
  /** Is called when the nested entry-form has been saved. Selects the fresh entry and clears the form */
  formSubmitted(form: Form<EntryResource>) {
    if (!this.selection.has(form)) {
      this.toggleItem.next(form);
    } else {
      // already in selection => update body
      const index = this.selection.index(form);
      this.selection.items[index].body = form.getBody();
    }
  }

  onChange() {
    super.onChange();
    if (this.hasSoloSelection() && this.entryListPop) {
      this.entryListPop.hide();
      return;
    }
  }

  focusSearchbar() {
    if (!this.entryListPop || !this.entryListPop.active) {
      this.focusEvent.emit(true);
    }
  }

  pasteValue(e) {
    const value = e.clipboardData.getData('text');
    if (this.config.identifierPattern && value.match(this.config.identifierPattern)) {
      this.preventDefault(e);
      this.sdk.api
        .entry(this.model, value)
        .then((entry) => this.addItem(new Item(entry, this.config)))
        .catch((error) => this.searchbar.filterList(value));
    }
  }

  filterDropdownList(list, query) {
    if (list) {
      this.dropdown.show();
      list.filter(this.lightModel.titleField, query);
    }
  }
}
