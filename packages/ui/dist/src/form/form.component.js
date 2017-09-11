"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const core_2 = require("@ec.components/core");
const loader_service_1 = require("../loader/loader.service");
const notifications_service_1 = require("../notifications/notifications.service");
const form_service_1 = require("./form.service");
/** This component renders a form using a FieldConfig Object. */
class FormComponent {
    /** Injects the services. */
    constructor(loaderService, notificationService, formService) {
        this.loaderService = loaderService;
        this.notificationService = notificationService;
        this.formService = formService;
        /** Emits when the form is submitted. The form can only be submitted if all Validators succeeded. */
        this.submitted = new core_1.EventEmitter();
        /** Emits when a new instance of Form is present */
        this.change = new core_1.EventEmitter();
    }
    /** On change, the form instance is (re)created by combining all inputs.
     * If no item is given, an empty form is created using the config.
     * You can also pass just an item to use its config and body.*/
    ngOnChanges() {
        this.init();
    }
    /** Inits the form (if ready) */
    init(item = this.item, config = this.config) {
        if (this.value) {
            this.form = new core_2.Form(this.value, config);
        }
        if (config) {
            this.form = new core_2.Form(null, config);
        }
        if (item && item.getBody) {
            this.form = new core_2.Form(item.getBody(), item.getConfig());
        }
        if (this.form) {
            this.group = this.formService.getGroup(this.form);
            this.group.valueChanges.subscribe((change) => {
                this.change.emit(this);
            });
        }
    }
    /* clears the form and uses the given config (falls back to existing one). Renders an empty form. */
    create(config) {
        this.dirtyTalk();
        this.init(null, config);
    }
    /** edits a given Item instance by using its config and body. */
    edit(item) {
        this.dirtyTalk();
        this.init(item);
    }
    /** edits a given value by creating an item and calling edit. */
    editValue(value, config = this.config) {
        const item = new core_2.Item(value, config);
        this.edit(item);
    }
    /** Method that is invoked when the form is submitted.*/
    submit() {
        const submit = this.form.save(this.group.value)
            .then((form) => {
            this.submitted.emit(this.form);
            this.edit(form);
            this.notificationService.emit({
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
    dirtyTalk() {
        if (this.group && this.group.dirty) {
            // console.warn('form is dirty');
            // TODO open dialog to either save or discard changes
        }
    }
}
FormComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-form',
                templateUrl: './form.component.html',
                styleUrls: ['./form.component.scss']
            },] },
];
/** @nocollapse */
FormComponent.ctorParameters = () => [
    { type: loader_service_1.LoaderService, },
    { type: notifications_service_1.NotificationsService, },
    { type: form_service_1.FormService, },
];
FormComponent.propDecorators = {
    'config': [{ type: core_1.Input },],
    'item': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
    'empty': [{ type: core_1.Input },],
    'submitButton': [{ type: core_1.Input },],
    'loader': [{ type: core_1.Input },],
    'submitted': [{ type: core_1.Output, args: ['submit',] },],
    'change': [{ type: core_1.Output },],
};
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map