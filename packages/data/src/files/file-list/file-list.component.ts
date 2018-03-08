import { resourceConfig } from './../../resource-config/resource-config';
import { Component, OnInit, Optional } from '@angular/core';
import { ResourceListComponent } from '../../resource-list/resource-list.component';
import { ListConfig } from '@ec.components/core';
import { LoaderService, NotificationsService } from '@ec.components/ui';
import { SdkService } from '@ec.components/data';
import { FileService } from '..';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import { ActivatedRoute } from '@angular/router';
import { ResourceList } from '../../resource-list/resource-list';
import DMAssetResource from 'ec.sdk/lib/resources/publicAPI/DMAssetResource';

@Component({
    selector: 'ec-file-list',
    templateUrl: 'file-list.component.html'
})

export class FileListComponent extends ResourceListComponent {
    /** list config  */
    config: ListConfig<DMAssetResource> = resourceConfig['dmAsset'];
    /** Injects services and listens for uploads to reload the list. */
    constructor(protected loaderService: LoaderService,
        protected sdk: SdkService,
        protected notificationService: NotificationsService,
        protected fileService: FileService,
        protected symbol: SymbolService,
        @Optional() route: ActivatedRoute) {
        super(loaderService, sdk, notificationService, symbol, route);
        this.fileService.uploads.subscribe((upload) => {
            this.list.load();
        });
        console.warn('WARNING: this could be deprecated soon!');
    }
    /** Creates the AssetList */
    createList(): ResourceList {
        return new ResourceList(this.config, this.api, 'asset');
    }

    delete(asset) {
        console.log('delete', asset);
    }
}
