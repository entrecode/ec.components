import { Component, EventEmitter, Input, OnChanges, Output, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Form, FormConfig, Item } from '@ec.components/core';
import { ItemConfig } from '@ec.components/core/src/item/item-config.interface';
import { LoaderComponent } from '../loader/loader.component';
import { LoaderService } from '../loader/loader.service';
import { NotificationsService } from '../notifications/notifications.service';
import { FormService } from './form.service';
import { WithLoader } from '../loader/with-loader.interface';
import { InputComponent } from '../io/input/input.component';
import { SymbolService } from '../symbol/symbol.service';

/** This component renders a form using a FieldConfig Object. */
@Component({
  selector: 'ec-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent<T> implements OnChanges, WithLoader {
  /** The instance of Form that is used. */
  public form: Form<T>;
  /** The current (angular) form group. */
  public group: FormGroup;
  /** The current form config */
  public config: FormConfig<T>;
  /** You can also use a FormConfig/ItemConfig as input (with defined fields property) */
  // tslint:disable-next-line:no-input-rename
  @Input('config') configInput: FormConfig<T>;
  /** You can also use an Item as input */
  @Input() readonly item: Item<T>;
  /** If you pass an object to value, the form will generate an item from it. */
  @Input() value: T;
  /** If set to true, the form will be rendered empty, to be referenced from the outside. */
  @Input() empty: boolean;
  /** If set to true, the form will be rendered without a submit button. */
  @Input() submitButton: boolean;
  /** If true, no notifications will be emitted. */
  @Input() silent: boolean;
  /** The loader that should be used. */
  @Input() loader: LoaderComponent;
  /** Emits when the form is submitted. The form can only be submitted if all Validators succeeded. */
  @Output() submitted: EventEmitter<Form<T>> = new EventEmitter();
  /** Emits when the form has been initialized.  */
  @Output() ready: EventEmitter<FormComponent<T>> = new EventEmitter();
  /** Emits when a new instance of Form is present */
  @Output() change: EventEmitter<FormComponent<T>> = new EventEmitter();
  /** The forms default loader. it is used when no loader is passed via the loader input */
  @ViewChild(LoaderComponent) defaultLoader: LoaderComponent;
  /** The InputComponents that are used to control the fields */
  @ViewChildren(InputComponent) inputs: QueryList<InputComponent>;

  /** Injects the services. */
  constructor(protected loaderService: LoaderService,
    protected notificationService: NotificationsService,
    protected formService: FormService,
    protected symbol: SymbolService) {
  }

  /** On change, the form instance is (re)created by combining all inputs.
   * If no item is given, an empty form is created using the config.
   * You can also pass just an item to use its config and body.*/
  ngOnChanges(changes?) {
    this.config = Object.assign({}, this.config || {}, this.configInput || {});
    this.init();
  }

  /** Inits the form (if ready) */
  protected init(item: Item<T> = this.item, config: FormConfig<T> = this.config) {
    if (this.value) { // if value is set, create item from value only
      this.form = new Form(this.value, config);
    } else if (item instanceof Item) {
      this.form = new Form(item.getBody(), item.getConfig() || config || {});
    } else if (config) {
      this.form = new Form(null, config);
    }
    this.initGroup();
  }
  /** Initializes the FormGroup which is generated from the current form instance. Sets valueChanges listener */
  protected initGroup() {
    if (!this.form) {
      return;
    }
    this.group = this.formService.getGroup(this.form);
    this.group.valueChanges.subscribe((change) => {
      this.change.emit(this);
    });
    this.ready.emit(this);
  }

  /** Clears the current value */
  clear() {
    delete this.value;
  }

  /* clears the form and uses the given config (falls back to existing one). Renders an empty form. */
  create(config: ItemConfig<T> = this.config) {
    this.dirtyTalk();
    this.clear();
    this.init(null, config);
  }

  /** edits a given Item instance by using its config and body. */
  edit(item: Item<T>) {
    this.dirtyTalk();
    this.init(item);
  }

  /** edits a given value by creating an item and calling edit. */
  editValue(value: T, config = this.config) {
    const item = new Item(value, config);
    this.edit(item);
  }

  /** Method that is invoked when the form is submitted.*/
  submit() {
    const submit = this.form.save(this.group.value)
      .then((form) => {
        this.submitted.emit(this.form);
        this.edit(form);
        if (this.silent) {
          return;
        }
        this.notificationService.emit({ // TODO pull out to entry-form?
          title: this.symbol.resolve('success.save'),
          type: 'success'
        });
      }).catch((err) => {
        console.error(err, err.errors);
        if (this.silent) {
          return;
        }
        this.notificationService.emit({
          title: this.symbol.resolve('error.save'),
          error: err,
          sticky: true
        });
      });
    this.loaderService.wait(submit, this.loader || this.defaultLoader);
    return submit;
  }

  /** Returns the current value of the form control group. When passing a property, it directly returns the property value. */
  getValue(property?: string) {
    if (property) {
      return this.group.value[property];
    }
    return this.group.value;
  }

  /** If dirty, opens a dialog that forces the user to decide if the current form should be saved or discarded. */
  protected dirtyTalk() {
    if (this.group && this.group.dirty) {
      // console.warn('form is dirty');
      // TODO open dialog to either save or discard changes
    }
  }
}
