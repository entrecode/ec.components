import { Component } from '@angular/core';
import { DatamanagerList } from './datamanager-list';
import { ResourceListComponent } from '../resource-list/resource-list.component';
import DataManagerResource from 'ec.sdk/src/resources/datamanager/DataManagerResource';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
@Component({
  selector: 'ec-datamanager-list',
  templateUrl: '../../../ui/src/list/list.component.html'
})
export class DatamanagerListComponent extends ResourceListComponent<DataManagerResource> {

  createList() {
    return new DatamanagerList(this.config, this.sdk);
  }
}
