import { Component, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetList } from './asset-list';
import { ResourceListComponent } from '../../resource-list/resource-list.component';
import { FileService } from '../file.service';
import { LoaderService } from '../../../ui/loader/loader.service';
import { NotificationsService } from '../../../ui/notifications/notifications.service';
import { SdkService } from '../../sdk/sdk.service';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
@Component({
  selector: 'ec-asset-list',
  templateUrl: '../../../ui/list/list.component.html'
})
export class AssetListComponent extends ResourceListComponent {

  constructor(protected loaderService: LoaderService,
    protected sdk: SdkService,
    protected notificationService: NotificationsService,
    protected fileService: FileService,
    @Optional() route: ActivatedRoute) {
    super(loaderService, sdk, notificationService, route);
    this.fileService.uploads.subscribe((upload) => {
      this.list.load();
    })
  }

  createList() {
    return new AssetList(this.config, this.sdk, this.fileService);
  }
}
