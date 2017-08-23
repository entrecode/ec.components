import { Component, Input } from '@angular/core';
import { SdkService } from '../sdk/sdk.service';
import { ModelConfigService } from '../model-config/model-config.service';
import { LoaderService } from '../../ui/loader/loader.service';
import { EntryList } from './entry-list';
import { CrudService } from '../crud/crud.service';
import { NotificationsService } from '../../ui/notifications/notifications.service';
import { ResourceListComponent } from '../resource-list/resource-list.component';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
@Component({
  selector: 'ec-entry-list',
  templateUrl: '../../ui/list/list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent extends ResourceListComponent { //use ResourceListComponent
  /** The model whose entries should be shown.*/
  @Input() model: string;

  /** The constructor will just call super of List*/
  constructor(protected loaderService: LoaderService,
    protected sdk: SdkService,
    protected notificationService: NotificationsService,
    protected modelConfig: ModelConfigService,
    protected crud: CrudService) {
    super(loaderService, sdk, notificationService);
  }

  createList() {
    if (!this.model || !this.config) {
      return;
    }
    this.crud.change({ model: this.model }) //, type: 'create'
    .subscribe((update) => {
      this.list.load();
    });
    return this.modelConfig.generateConfig(this.model).then((config) => {
      this.config = this.config || {};
      Object.assign(this.config, config);
      return new EntryList(this.model, this.config, this.sdk);
    });

  }
}
