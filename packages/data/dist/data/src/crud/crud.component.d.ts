/**
 * Created by felix on 26.05.17.
 */
import { EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudConfig } from './crud-config.interface';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { SdkService } from '../sdk/sdk.service';
import { Selection } from '@ec.components/core/src/selection/selection';
import { LoaderComponent } from '@ec.components/ui/src/loader/loader.component';
import { LoaderService } from '@ec.components/ui/src/loader/loader.service';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import 'rxjs/add/operator/switchMap';
/** The CrudComponent takes at least a model name to render an entry list with create/edit/delete functionality out of the box.
 * ```html
 * <ec-crud model="muffin"></ec-crud>
 * ```
 * */
export declare class CrudComponent<T> {
    private sdk;
    private loaderService;
    private notificationService;
    router: Router;
    route: ActivatedRoute;
    /** The model that should be crud'ed. */
    model: string;
    /** CrudConfig for customization of the crud's UI.*/
    config: CrudConfig<T>;
    /** The selection that should be used */
    selection: Selection<T>;
    /** The EntryForm inside the template. */
    form: EntryFormComponent;
    /** The EntryList inside the template. */
    list: EntryListComponent;
    /** The Pop inside the template. */
    pop: PopComponent;
    /** The lists loader */
    loader: LoaderComponent;
    /** Emits when a list element is clicked */
    select: EventEmitter<any>;
    /** Emits when the selection has changed */
    selected: EventEmitter<any>;
    constructor(sdk: SdkService, loaderService: LoaderService, notificationService: NotificationsService, router: Router, route: ActivatedRoute);
    /** Logs the current form (Developer help). */
    private log(form);
    /** Returns true if the given method is part of the methods array (or if there is no methods array) */
    hasMethod(method: string): boolean;
    /** Determines if the current form can be saved, based on the allowed method (edit/update). */
    maySave(form: EntryFormComponent): boolean;
    /** Returns true if the visible fields in the list differ from the visible fields in the form*/
    mustReload(item: any): boolean;
    /** Loads the clicked entry item, depending on the configured levels. Reloads the entry if the form has fields the which list has not. */
    private loadEntry(item);
    /** Is called when an item in the list is clicked. */
    private selectEntry(item, form);
    /** Returns the pop class that should be used, either uses config.popClass or defaults to sidebar-left. */
    getPopClass(): string;
}
