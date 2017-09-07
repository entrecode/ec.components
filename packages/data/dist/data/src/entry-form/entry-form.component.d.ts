import { EventEmitter } from '@angular/core';
import { FormComponent } from '@ec.components/ui/src/form/form.component';
import { ModelConfigService } from '../model-config/model-config.service';
import { LoaderService } from '@ec.components/ui/src/loader/loader.service';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import { CrudService } from '../crud/crud.service';
import { Item } from '@ec.components/core/src/item/item';
import { FormConfig } from '@ec.components/core/src/form/form-config.interface';
import { FormService } from '@ec.components/ui/src/form/form.service';
/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
export declare class EntryFormComponent extends FormComponent {
    protected loaderService: LoaderService;
    private modelConfig;
    protected notificationService: NotificationsService;
    protected crud: CrudService;
    protected formService: FormService;
    /** The model of the form. It is used to extract the schema and generate the config from. */
    model: string;
    /** The entry that should be edited. */
    entry: any;
    /** This output fires when the entry has been deleted using deleteEntry(). */
    deleted: EventEmitter<any>;
    /** Injects the required services. */
    constructor(loaderService: LoaderService, modelConfig: ModelConfigService, notificationService: NotificationsService, crud: CrudService, formService: FormService);
    /** As soon as the model is known, the config is generated to then instantiate the form with. */
    init(item?: Item<any>, config?: FormConfig<any>): void;
    /** Yields true if the current edited entry is already existing in the backend. */
    isEditing(): any;
    /** Deletes the edited entry. Fires the deleted Output. */
    deleteEntry(): void;
}
