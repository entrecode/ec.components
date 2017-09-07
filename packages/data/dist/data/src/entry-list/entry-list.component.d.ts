import { ActivatedRoute } from '@angular/router';
import { SdkService } from '../sdk/sdk.service';
import { ModelConfigService } from '../model-config/model-config.service';
import { LoaderService } from '@ec.components/ui/src/loader/loader.service';
import { EntryList } from './entry-list';
import { CrudService } from '../crud/crud.service';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import { ResourceListComponent } from '../resource-list/resource-list.component';
import EntryResource from 'ec.sdk/src/resources/publicAPI/EntryResource';
/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
export declare class EntryListComponent extends ResourceListComponent<EntryResource> {
    protected loaderService: LoaderService;
    protected sdk: SdkService;
    protected notificationService: NotificationsService;
    protected modelConfig: ModelConfigService;
    protected crud: CrudService;
    route: ActivatedRoute;
    /** The model whose entries should be shown.*/
    model: string;
    /** The constructor will just call super of List*/
    constructor(loaderService: LoaderService, sdk: SdkService, notificationService: NotificationsService, modelConfig: ModelConfigService, crud: CrudService, route: ActivatedRoute);
    initFilter(): void;
    createList(): Promise<EntryList>;
}
