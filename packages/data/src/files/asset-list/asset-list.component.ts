import { Component, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetList } from './asset-list';
import { ResourceListComponent } from '../../resource-list/resource-list.component';
import { FileService } from '../file.service';
import { LoaderService } from '@ec.components/ui/src/loader/loader.service';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import { SdkService } from '../../sdk/sdk.service';
import AssetResource from 'ec.sdk/src/resources/datamanager/AssetResource';
import PublicAssetResource from 'ec.sdk/src/resources/publicAPI/PublicAssetResource';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
@Component({
  selector: 'ec-asset-list',
  template: require('../../../../ui/src/list/list.component.html')
})
export class AssetListComponent extends ResourceListComponent<PublicAssetResource | AssetResource> {

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

  createList(): AssetList {
    return new AssetList(this.config, this.sdk, this.fileService);
  }
}
