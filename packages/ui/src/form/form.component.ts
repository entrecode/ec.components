import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Form, FormConfig, Item } from '@ec.components/core';
import { ItemConfig } from '@ec.components/core/src/item/item-config.interface';
import { LoaderComponent } from '../loader/loader.component';
import { LoaderService } from '../loader/loader.service';
import { NotificationsService } from '../notifications/notifications.service';
import { FormService } from './form.service';

/** This component renders a form using a FieldConfig Object. */
@Component({
  selector: 'ec-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  /** The instance of Form that is used. */
  protected form: Form<any>;
  /** The current (angular) form group. */
  public group: FormGroup;
  /** You can also use a FormConfig/ItemConfig as input (with defined fields property) */
  @Input() readonly config: FormConfig<any>;
  /** You can also use an Item as input */
  @Input() readonly item: Item<any>;
  /** If you pass an object to value, the form will generate an item from it. */
  @Input() value: any;
  /** If set to true, the form will be rendered empty, to be referenced from the outside. */
  @Input() empty: boolean;
  /** If set to true, the form will be rendered without a submit button. */
  @Input() submitButton: boolean;
  /** The loader that should be used. */
  @Input() loader: LoaderComponent;
  /** Emits when the form is submitted. The form can only be submitted if all Validators succeeded. */
  @Output('submit') submitted: EventEmitter<FormGroup> = new EventEmitter();
  /** Emits when a new instance of Form is present */
  @Output() change: EventEmitter<FormComponent> = new EventEmitter();

  /** Injects the services. */
  constructor(protected loaderService: LoaderService,
    protected notificationService: NotificationsService,
    protected formService: FormService) {
  }

  /** On change, the form instance is (re)created by combining all inputs.
   * If no item is given, an empty form is created using the config.
   * You can also pass just an item to use its config and body.*/
  ngOnChanges() {
    this.init();
  }

  /** Inits the form (if ready) */
  protected init(item: Item<any> = this.item, config: FormConfig<any> = this.config) {
    if (this.value) { // if value is set, create item from value only
      this.form = new Form(this.value, config);
    }
    if (config) {
      this.form = new Form(null, config);
    }
    if (item && item.getBody) { // TODO find cleaner way to check if is item
      this.form = new Form(item.getBody(), item.getConfig());
    }
    if (this.form) {
      this.group = this.formService.getGroup(this.form);
      this.group.valueChanges.subscribe((change) => {
        this.change.emit(this);
      });
    }
  }

  /* clears the form and uses the given config (falls back to existing one). Renders an empty form. */
  create(config?: ItemConfig<any>) {
    this.dirtyTalk();
    this.init(null, config);
  }

  /** edits a given Item instance by using its config and body. */
  edit(item: Item<any>) {
    this.dirtyTalk();
    this.init(item);
  }

  /** edits a given value by creating an item and calling edit. */
  editValue(value: any, config = this.config) {
    const item = new Item(value, config);
    this.edit(item);
  }

  /** Method that is invoked when the form is submitted.*/
  submit() {
    const submit = this.form.save(this.group.value)
    .then((form) => {
      this.submitted.emit(this.group);
      this.edit(form);
      this.notificationService.emit({ // TODO pull out to entry-form?
        title: 'Eintrag gespeichert',
        type: 'success'
      });
    }).catch((err) => {
      console.error(err, err.errors);
      this.notificationService.emit({
        title: 'Fehler beim Speichern',
        error: err
      });
    });
    this.loaderService.wait(submit, this.loader);
    return submit;
  }

  /** Returns the current value of the form control group. */
  getValue() {
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
