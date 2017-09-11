"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const form_component_1 = require("@ec.components/ui/src/form/form.component");
const model_config_service_1 = require("../model-config/model-config.service");
const loader_service_1 = require("@ec.components/ui/src/loader/loader.service");
const notifications_service_1 = require("@ec.components/ui/src/notifications/notifications.service");
const crud_service_1 = require("../crud/crud.service");
const item_1 = require("@ec.components/core/src/item/item");
const form_service_1 = require("@ec.components/ui/src/form/form.service");
/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
class EntryFormComponent extends form_component_1.FormComponent {
    /** Injects the required services. */
    constructor(loaderService, modelConfig, notificationService, crud, formService) {
        super(loaderService, notificationService, formService);
        this.loaderService = loaderService;
        this.modelConfig = modelConfig;
        this.notificationService = notificationService;
        this.crud = crud;
        this.formService = formService;
        /** This output fires when the entry has been deleted using deleteEntry(). */
        this.deleted = new core_1.EventEmitter();
    }
    /** As soon as the model is known, the config is generated to then instantiate the form with. */
    init(item = this.item, config = this.config) {
        if (!this.model) {
            return;
        }
        Promise.resolve(config || this.modelConfig.generateConfig(this.model))
            .then((_config) => {
            if (this.entry) {
                item = new item_1.Item(this.entry, _config);
            }
            super.init(item, _config);
        });
    }
    /** Yields true if the current edited entry is already existing in the backend. */
    isEditing() {
        if (!this.form) {
            return;
        }
        const entry = this.form.getBody();
        return entry && entry.save;
    }
    /** Deletes the edited entry. Fires the deleted Output. */
    deleteEntry() {
        if (!this.form || !this.isEditing()) {
            return;
        }
        const deletion = this.crud.del(this.model, this.form.getBody()).then(() => {
            this.deleted.emit();
            this.create();
            this.notificationService.emit({
                title: 'Eintrag gelöscht', type: 'success'
            });
        }).catch((error) => {
            this.notificationService.emit({
                title: 'Fehler beim Löschen', error
            });
        });
        this.loaderService.wait(deletion, this.loader);
        return deletion;
    }
}
EntryFormComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-entry-form',
                template: require('../../../ui/src/form/form.component.html'),
                styles: [require('./entry-form.component.scss')]
            },] },
];
/** @nocollapse */
EntryFormComponent.ctorParameters = () => [
    { type: loader_service_1.LoaderService, },
    { type: model_config_service_1.ModelConfigService, },
    { type: notifications_service_1.NotificationsService, },
    { type: crud_service_1.CrudService, },
    { type: form_service_1.FormService, },
];
EntryFormComponent.propDecorators = {
    'model': [{ type: core_1.Input },],
    'entry': [{ type: core_1.Input },],
    'deleted': [{ type: core_1.Output },],
};
exports.EntryFormComponent = EntryFormComponent;
//# sourceMappingURL=entry-form.component.js.map