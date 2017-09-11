import { EventEmitter, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Form, FormConfig, Item } from '@ec.components/core';
import { ItemConfig } from '@ec.components/core/src/item/item-config.interface';
import { LoaderComponent } from '../loader/loader.component';
import { LoaderService } from '../loader/loader.service';
import { NotificationsService } from '../notifications/notifications.service';
import { FormService } from './form.service';
/** This component renders a form using a FieldConfig Object. */
export declare class FormComponent implements OnChanges {
    protected loaderService: LoaderService;
    protected notificationService: NotificationsService;
    protected formService: FormService;
    /** The instance of Form that is used. */
    protected form: Form<any>;
    /** The current (angular) form group. */
    group: FormGroup;
    /** You can also use a FormConfig/ItemConfig as input (with defined fields property) */
    readonly config: FormConfig<any>;
    /** You can also use an Item as input */
    readonly item: Item<any>;
    /** If you pass an object to value, the form will generate an item from it. */
    value: any;
    /** If set to true, the form will be rendered empty, to be referenced from the outside. */
    empty: boolean;
    /** If set to true, the form will be rendered without a submit button. */
    submitButton: boolean;
    /** The loader that should be used. */
    loader: LoaderComponent;
    /** Emits when the form is submitted. The form can only be submitted if all Validators succeeded. */
    submitted: EventEmitter<Form<any>>;
    /** Emits when a new instance of Form is present */
    change: EventEmitter<FormComponent>;
    /** Injects the services. */
    constructor(loaderService: LoaderService, notificationService: NotificationsService, formService: FormService);
    /** On change, the form instance is (re)created by combining all inputs.
     * If no item is given, an empty form is created using the config.
     * You can also pass just an item to use its config and body.*/
    ngOnChanges(): void;
    /** Inits the form (if ready) */
    protected init(item?: Item<any>, config?: FormConfig<any>): void;
    create(config?: ItemConfig<any>): void;
    /** edits a given Item instance by using its config and body. */
    edit(item: Item<any>): void;
    /** edits a given value by creating an item and calling edit. */
    editValue(value: any, config?: FormConfig<any>): void;
    /** Method that is invoked when the form is submitted.*/
    submit(): Promise<void>;
    /** Returns the current value of the form control group. */
    getValue(): any;
    /** If dirty, opens a dialog that forces the user to decide if the current form should be saved or discarded. */
    protected dirtyTalk(): void;
}
