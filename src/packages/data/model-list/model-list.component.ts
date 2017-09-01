import { Component, Input } from '@angular/core';
import { ModelList } from './model-list';
import { ResourceListComponent } from '../resource-list/resource-list.component';

import DataManagerResource from 'ec.sdk/src/resources/datamanager/DataManagerResource';

/** The ModelListComponent is a thin holder of an ModelList instance. It extends the ResourceListComponent */
@Component({
  selector: 'ec-model-list',
  templateUrl: '../../ui/list/list.component.html'
})
export class ModelListComponent extends ResourceListComponent {
  @Input() datamanager: string | DataManagerResource;//: DataManagerResource;

  createList() {
    if (!this.datamanager) {
      console.log('no datamanager given..');
      return;
    }
    return new ModelList(this.datamanager, this.config, this.sdk);
  }
}
