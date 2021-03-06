/**
 * Created by felix on 26.05.17.
 */
import { Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SdkService } from '../sdk/sdk.service';
import { Selection } from '@ec.components/core';
import { LoaderComponent } from '@ec.components/ui';
import { LoaderService } from '@ec.components/ui';
import { NotificationsService } from '@ec.components/ui';
import { AuthService } from '../auth/auth.service';
import { WithLoader } from '@ec.components/ui';
import { CrudConfig } from '../crud/crud-config.interface';
import { ResourceListComponent } from '../resource-list/resource-list.component';
import { ResourcePopComponent } from '../resource-pop/resource-pop.component';
import Core from 'ec.sdk/lib/Core';

/** The ResourceCrudComponent takes a relation name and api to render a resource list with create/edit/delete functionality out of the box.
 * ```html
 * <ec-resource-crud [api]="sdk.datamanager" relation="dataManager"></ec-resource-crud>
 * ```
 * */
@Component({
  selector: 'ec-resource-crud',
  templateUrl: './resource-crud.component.html',
})
export class ResourceCrudComponent<T> implements OnInit, WithLoader {
  /** The API Connector that possesses the resource list, see https://entrecode.github.io/ec.sdk/#api-connectors */
  @Input() api: Core; // sdk api connector
  /** The name of the resource. If given, the generic ListResource loading will be used (api.resourceList) */
  @Input() relation: string;
  /** CrudConfig for customization of the crud's UI.*/
  @Input() config: CrudConfig<T> = {};
  /** The selection that should be used */
  @Input() selection: Selection<T>;
  /** The ResourceListComponent inside the template. */
  @ViewChild(ResourceListComponent) list: ResourceListComponent;
  /** The Pop inside the template. */
  @ViewChild(ResourcePopComponent, { static: true }) pop: ResourcePopComponent;
  /** The lists loader */
  @ViewChild(LoaderComponent, { static: true }) loader: LoaderComponent;
  /** Emits when a list element is clicked */
  @Output() columnClicked: EventEmitter<any> = new EventEmitter();
  /** Emits when the selection has changed */
  @Output() selected: EventEmitter<any> = new EventEmitter();
  /** Output that is nexted when pressing the create button */
  @Output() createClicked: EventEmitter<any> = new EventEmitter();

  constructor(
    private sdk: SdkService,
    private auth: AuthService,
    private loaderService: LoaderService,
    private notificationService: NotificationsService,
    @Optional() public router: Router,
    @Optional() public route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initMethods();
  }

  initMethods() {
    if (!this.relation) {
      return;
    }
    this.auth.getAllowedResourceMethods(this.relation, {}, this.config.methods).then((methods) => {
      this.config.methods = methods;
    });
  }

  /** Returns true if the given method is part of the methods array (or if there is no methods array) */
  public hasMethod(method: string) {
    return this.config.methods && this.config.methods.indexOf(method) !== -1;
  }

  /** Called on list columnClicked */
  select(item) {
    if (!item) {
      return;
    }
    if (this.columnClicked.observers.length) {
      this.columnClicked.emit(item);
      return;
    }
    this.pop.edit(item.getBody());
    // TODO: check CrudComponent#loadEntry for further inspiration
  }

  /** Method that is invoked when pressing the create button. Default behaviour is opening the resource-pop. */
  create() {
    if (this.createClicked.observers.length) {
      this.createClicked.next();
    } else if (this.pop) {
      this.pop.create();
    }
  }
}
