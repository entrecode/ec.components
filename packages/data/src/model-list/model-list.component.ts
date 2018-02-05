import { Component, Input } from '@angular/core';
import { ModelList } from './model-list';
import { ResourceListComponent } from '../resource-list/resource-list.component';

import DataManagerResource from 'ec.sdk/lib/resources/datamanager/DataManagerResource';
import ModelResource from 'ec.sdk/lib/resources/datamanager/ModelResource';
import { ListConfig } from '@ec.components/core';

/** The ModelListComponent is a thin holder of an ModelList instance. It extends the ResourceListComponent.
 * Deprecated due to ResourceList (use model relation on a Datamanager api).
 */
@Component({
  selector: 'ec-model-list',
  templateUrl: '../../../ui/src/list/list.component.html'
})
export class ModelListComponent extends ResourceListComponent {
  config: ListConfig<ModelResource> = {};
  @Input() datamanager: string | DataManagerResource;

  createList() {
    if (!this.datamanager) {
      console.log('no datamanager given..');
      return;
    }
    return new ModelList(this.datamanager, this.config, this.sdk);
  }
}
