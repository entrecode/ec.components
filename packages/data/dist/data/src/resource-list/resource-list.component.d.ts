import { ActivatedRoute } from '@angular/router';
import { SdkService } from '../sdk/sdk.service';
import { LoaderComponent } from '@ec.components/ui/src/loader/loader.component';
import { LoaderService } from '@ec.components/ui/src/loader/loader.service';
import { ListComponent } from '@ec.components/ui/src/list/list.component';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import { ResourceList } from './resource-list';
/** The ResourceListComponent is an extension of ListComponent for SDK ListResources.
 * It is meant to be extended and overriden the createList method. See e.g. AssetListComponent. */
export declare class ResourceListComponent<T> extends ListComponent<T> {
    protected loaderService: LoaderService;
    protected sdk: SdkService;
    protected notificationService: NotificationsService;
    route: ActivatedRoute;
    /** If true, only one item is selectable next */
    solo: boolean;
    /** The instance of an EntryList */
    list: ResourceList<T>;
    /** The loader that should be shown while the list is loaded. */
    loader: LoaderComponent;
    /** The constructor will just call super of List*/
    constructor(loaderService: LoaderService, sdk: SdkService, notificationService: NotificationsService, route: ActivatedRoute);
    /** The method to create the list*/
    protected createList(): Promise<ResourceList<T>> | ResourceList<T>;
    /** When changing the model or the config, the list config will be (re)generated, using the model's schema*/
    ngOnChanges(): void;
    /** This method will filter the list by a given property value and optional operator. */
    filter(property: string, value: any): void;
    initFilterQuery(fieldFilter: (property: string, value: any) => {
        property;
        value;
    }): void;
}
