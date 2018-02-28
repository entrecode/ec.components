import { Component, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetList } from './asset-list';
import { ResourceListComponent } from '../../resource-list/resource-list.component';
import { FileService } from '../file.service';
import { LoaderService } from '@ec.components/ui/src/loader/loader.service';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import { SdkService } from '../../sdk/sdk.service';
import AssetResource from 'ec.sdk/lib/resources/datamanager/AssetResource';
import PublicAssetResource from 'ec.sdk/lib/resources/publicAPI/PublicAssetResource';
import { ListConfig } from '@ec.components/core';
import { SymbolService } from '../../../../ui/src/symbol/symbol.service';

/** Displays an AssetList. Subscribes to uploads from the fileServices and reloads the List. Extends ResourceList */
@Component({
  selector: 'ec-asset-list',
  templateUrl: '../../../../ui/src/list/list.component.html'
})
export class AssetListComponent extends ResourceListComponent {
  config: ListConfig<AssetResource | PublicAssetResource> = {};

  constructor(protected loaderService: LoaderService,
    protected sdk: SdkService,
    protected notificationService: NotificationsService,
    protected fileService: FileService,
    protected symbol: SymbolService,
    @Optional() route: ActivatedRoute) {
    super(loaderService, sdk, notificationService, symbol, route);
    this.fileService.uploads.subscribe((upload) => {
      this.list.load();
    })
  }
  /** Creates the AssetList */
  createList(): AssetList {
    return new AssetList(this.config, this.sdk, this.fileService);
  }
}
