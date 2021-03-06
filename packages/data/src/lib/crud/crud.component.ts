/**
 * Created by felix on 26.05.17.
 */
import { Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudConfig } from './crud-config.interface';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { SdkService } from '../sdk/sdk.service';
import { Selection } from '@ec.components/core';
import { LoaderComponent } from '@ec.components/ui';
import { NotificationsService, LoaderService } from '@ec.components/ui';
import { AuthService } from '../auth/auth.service';
import { EntryPopComponent } from '../entry-pop/entry-pop.component';
import { WithLoader } from '@ec.components/ui';
import { Notification, WithNotifications, SymbolService } from '@ec.components/ui';
import { ModelConfigService } from '../model-config/model-config.service';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';

/** The CrudComponent takes at least a model name to render an entry list with create/edit/delete functionality out of the box.
 * ```html
 * <ec-crud model="muffin"></ec-crud>
 * ```
 * <example-url>https://components.entrecode.de/entries/crud?e=1</example-url>
 * */
@Component({
  selector: 'ec-crud',
  templateUrl: './crud.component.html',
})
export class CrudComponent implements OnInit, WithLoader, WithNotifications {
  /** The model that should be crud'ed. */
  @Input() model: string;
  /** CrudConfig for customization of the crud's UI.*/
  @Input() config: CrudConfig<EntryResource> = {};
  /** The selection that should be used */
  @Input() selection: Selection<EntryResource>;
  /** The EntryList inside the template. */
  @ViewChild(EntryListComponent) list: EntryListComponent;
  /** The Pop inside the template. */
  @ViewChild(EntryPopComponent, { static: true }) entryPop: EntryPopComponent;
  /** The lists loader */
  @ViewChild(LoaderComponent, { static: true }) loader: LoaderComponent;
  /** Emits when a list element is clicked */
  @Output() columnClicked: EventEmitter<any> = new EventEmitter();
  /** Emits when the selection has changed */
  @Output() selected: EventEmitter<any> = new EventEmitter();
  /** Emitted Notifications */
  notifications: Notification[] = [];

  constructor(
    private sdk: SdkService,
    private auth: AuthService,
    private loaderService: LoaderService,
    private modelConfig: ModelConfigService,
    private notificationService: NotificationsService,
    private symbol: SymbolService,
    private cdr: ChangeDetectorRef,
    @Optional() public router: Router,
    @Optional() public route: ActivatedRoute,
  ) {
    /* if (route) {
      merge(route.data, route.params, route.queryParams)
        .subscribe(({ model }) => {
          if (model) {
            this.model = model;
          }
        });
    } */
  }

  ngOnInit() {
    this.auth.getAllowedModelMethods(this.model, this.config.methods).then((methods) => {
      this.config.methods = methods;
      this.cdr.markForCheck();
    });
    this.modelConfig.generateConfig(this.model).then(config => {
      this.config = {
        ...config,
        ...this.config
      };
    });
  }

  /** Returns true if the given method is part of the methods array (or if there is no methods array) */
  public hasMethod(method: string) {
    return this.config.methods && this.config.methods.indexOf(method) !== -1;
  }

  /** Returns true if the visible fields in the list differ from the visible fields in the form*/
  public mustReload(item) {
    return !Object.keys(item.config.fields).reduce((equal, property) => {
      return equal && (item.config.fields[property].list !== false || item.config.fields[property].form === false);
    }, true);
  }

  /** Loads the clicked entry item, depending on the configured levels. Reloads the entry if the form has fields the which list has not. */
  private loadEntry(item) {
    return this.modelConfig
      .getMinLevel(this.model, this.config.fields)
      .then((minLevel) => {
        const levels = Math.max(minLevel, this.config.levels || 1);
        if (!this.config.alwaysLoadEntry && !this.mustReload(item) && levels === 1) {
          return item.getBody();
        }
        return this.sdk.api.entry(this.model, item.id(), levels);
      })
      .then((loadedEntry) => {
        this.entryPop.edit(loadedEntry);
        this.notificationService.emit({ hide: this.notifications });
      })
      .catch((err) => {
        console.log('error while loading entry to edit', err);
        this.notificationService.emit({
          title: this.symbol.resolve('error.load'),
          error: err,
          sticky: true,
          hide: this.notifications,
          replace: this.notifications,
        });
      });
  }

  /** Is called when an item in the list is clicked. */
  public selectEntry(item) {
    if (!item) {
      return;
    }
    if (this.columnClicked.observers.length) {
      this.columnClicked.emit(item);
      return;
    }
    this.loaderService.wait(this.loadEntry(item), this.loader);
  }
}
