import { DatamanagerList } from './datamanager-list';
import { ResourceListComponent } from '../resource-list/resource-list.component';
import DataManagerResource from 'ec.sdk/src/resources/datamanager/DataManagerResource';
/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
export declare class DatamanagerListComponent extends ResourceListComponent<DataManagerResource> {
    createList(): DatamanagerList;
}
