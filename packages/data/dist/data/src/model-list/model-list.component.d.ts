import { ModelList } from './model-list';
import { ResourceListComponent } from '../resource-list/resource-list.component';
import DataManagerResource from 'ec.sdk/src/resources/datamanager/DataManagerResource';
import ModelResource from 'ec.sdk/src/resources/datamanager/ModelResource';
/** The ModelListComponent is a thin holder of an ModelList instance. It extends the ResourceListComponent */
export declare class ModelListComponent extends ResourceListComponent<ModelResource> {
    datamanager: string | DataManagerResource;
    createList(): ModelList;
}
