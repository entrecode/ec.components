import { ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Action, ActionbarComponent, ActionFunction, NotificationsService, selectTemplate } from '@ec.components/ui';
import Core from 'ec.sdk/lib/Core';
import { ResourceConfig } from '../resource-config/resource-config.service';
import { SdkService } from '../sdk/sdk.service';
import { ResourceActionbarComponent } from './resource-actionbar.component';

@Component({
  selector: 'ec-api-actionbar',
  template: selectTemplate,
})
export class ApiActionbarComponent extends ResourceActionbarComponent implements OnInit {
  @Input() actions: Action[] = [
    {
      id: 'data',
      title: 'Datamanager',
      action: (item, actionbar) =>
        this.loadResourceListActions({
          api: this.sdk.datamanager,
          relation: 'dataManager',
          actionbar,
          action: (dm) => {
            this.sdk.useDatamanager(dm.shortID);
            actionbar.loadActions([
              this.resourceAction({
                actionbar,
                title: 'Models',
                relation: 'model',
                api: dm,
                action: (model) =>
                  actionbar.loadActions([
                    {
                      id: 'entry',
                      title: 'Entries',
                      action: () => {
                        this.sdk.api.entryList(model.title).then((entryList) => {
                          const actions = entryList.getAllItems().map((listEntry) => {
                            return {
                              title: listEntry._entryTitle,
                              id: listEntry.id,
                              data: listEntry,
                              action: (entryItem) => {
                                const path = this.getPath().join('/');
                                this.openInEditor(path);
                              },
                            };
                          });
                          actionbar.loadActions(actions);
                        });
                      },
                    },
                    {
                      id: 'edit',
                      title: 'Edit Model',
                      action: () => {
                        const path = this.getPath().join('/');
                        this.openInEditor(path);
                      },
                    },
                  ]),
              }),
              this.resourceAction({
                actionbar,
                title: 'Asset Group',
                relation: 'assetGroup',
                path: 'asset-group',
                api: dm,
                action: () => this.openCurrentPath(),
              }),
              this.resourceAction({
                actionbar,
                title: 'Datamanager Accounts',
                relation: 'dmAccount',
                api: dm,
                action: () => this.openCurrentPath(),
              }),
              {
                title: 'Edit',
                id: 'edit',
                action: () => this.openCurrentPath(),
              },
            ]);
          },
        }),
    },
    {
      id: 'accounts',
      title: 'Account Server',
      action: (item, actionbar) =>
        this.loadApiRelationActions(this.sdk.accounts, actionbar, () => this.openCurrentPath()),
    },
  ];

  constructor(
    public notificationService: NotificationsService,
    public sdk: SdkService,
    public resourceConfig: ResourceConfig,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
  ) {
    super(notificationService, sdk, resourceConfig, elementRef, cdr);
  }

  loadApiRelationActions(api: Core, actionbar: ActionbarComponent = this, action?: ActionFunction) {
    const actions = Object.keys(api.getAvailableRelations()).map((relationName) => ({
      id: relationName,
      title: relationName,
      relation: relationName,
      action: (item) => {
        this.loadResourceListActions({ api, relation: relationName, actionbar, action });
      },
    }));
    actionbar.loadActions(actions);
  }

  openCurrentPath() {
    const path = this.getPath().join('/');
    this.openInEditor(path);
  }

  openInEditor(path, env = 'stage') {
    window.open(`https://localhost:4200/${env}/${path}`, '_blank');
  }

  ngOnInit() {
    this.loadActions(this.actions);
  }
}
