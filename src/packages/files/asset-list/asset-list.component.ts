import { Component, Input } from '@angular/core';
import { SdkService } from '../../data/sdk/sdk.service';
import { LoaderComponent } from '../../ui/loader/loader.component';
import { LoaderService } from '../../ui/loader/loader.service';
import { ListComponent } from '../../ui/list/list.component';
import { Selection } from '../../core/selection/selection';
import { ListConfig } from '../../core/list/list-config.interface';
import { AssetList } from './asset-list';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
@Component({
  selector: 'ec-asset-list',
  templateUrl: '../../ui/list/list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent extends ListComponent {
  /** The config which is used mainly for the pagination. */
  @Input() config: ListConfig = {};
  /** If true, only one item is selectable next */
  @Input() solo: boolean;
  /** The instance of an EntryList */
  list: AssetList<any>;
  /** The loader that should be shown while the list is loaded. */
  @Input() loader: LoaderComponent;

  /** The constructor will just call super of List*/
  constructor(protected loaderService: LoaderService, private sdk: SdkService) {
    super();
  }

  /** When changing the model or the config, the list config will be (re)generated, using the model's schema*/
  ngOnChanges() {
    if (!this.sdk) {
      console.log('waiting for sdk..');
      return;
    }
    //TODO consume asset change service?

    this.list = new AssetList(this.config, this.sdk);
    this.list.change$.subscribe((list) => {
      if (!this.selection && this.list.config && !this.list.config.disableSelection) {
        this.selection = new Selection([], this.list.config);
      }
    });
    this.list.loading$.subscribe((promise: Promise<any>) => {
      this.loaderService.wait(promise, this.loader);
    })
  }

  /** This method will filter the list by a given property value and optional operator. */
  filter(property: string, value: any, operator: string = 'search') {
    this.list.filter(property, value, operator);
  }
}
