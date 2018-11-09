import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ActionbarComponent, Action } from '@ec.components/ui/src/actionbar/actionbar.component';
import { SdkService } from '../..';
import { NotificationsService } from '@ec.components/ui';
import { ResourceConfig } from '../resource-config/resource-config.service';

@Component({
    selector: 'ec-resource-actionbar',
    templateUrl: '../../../ui/src/select/select.component.html', // TODO avoid relative paths
})

export class ResourceActionbarComponent extends ActionbarComponent implements OnInit {

    @Input() actions: Action[] = [
        {
            id: 'data',
            title: 'Datamanager',
            action: (item, actionbar) =>
                this.loadResourceListActions(
                    this.sdk.datamanager, 'dataManager', actionbar,
                    (dm) => {
                        this.sdk.useDatamanager(dm.shortID);
                        actionbar.loadActions([
                            this.resourceAction({
                                actionbar,
                                title: 'Models',
                                relation: 'model',
                                api: dm,
                                action: (model) => actionbar.loadActions(
                                    [
                                        {
                                            id: 'entry',
                                            title: 'Entries',
                                            action: () => {
                                                this.sdk.api.entryList(model.title).then((entryList) => {
                                                    const actions = entryList.getAllItems()
                                                        .map(listEntry => {
                                                            return {
                                                                title: listEntry._entryTitle,
                                                                id: listEntry.id,
                                                                data: listEntry,
                                                                action: (entryItem) => {
                                                                    const path = this.getPath().join('/');
                                                                    this.openInEditor(path);
                                                                }
                                                            }
                                                        })
                                                    actionbar.loadActions(actions);
                                                })
                                            }
                                        },
                                        {
                                            id: 'edit',
                                            title: 'Edit Model',
                                            action: () => {
                                                const path = this.getPath().join('/');
                                                this.openInEditor(path);
                                            }
                                        }
                                    ]
                                )
                            }),
                            this.resourceAction({
                                actionbar,
                                title: 'Asset Group',
                                relation: 'assetGroup',
                                path: 'asset-group',
                                api: dm
                            }),
                            this.resourceAction({
                                actionbar,
                                title: 'Datamanager Accounts',
                                relation: 'dmAccount',
                                api: dm
                            }),
                            {
                                title: 'Edit',
                                id: 'edit',
                                action: () => this.openCurrentPath()
                            },
                        ])
                    }
                )
        },
        {
            id: 'accounts',
            title: 'Account Server',
            action: (item, actionbar) =>
                this.loadApiRelationActions(
                    this.sdk.accounts, actionbar
                )
        }
    ];

    constructor(
        public notificationService: NotificationsService,
        public sdk: SdkService,
        public resourceConfig: ResourceConfig,
        public elementRef: ElementRef
    ) {
        super(elementRef);
    }

    ngOnInit() {
        this.loadActions(this.actions);
    }

    openInEditor(path, env = 'stage') {
        window.open(`https://localhost:4200/${env}/${path}`, '_blank');
    }

    openCurrentPath() {
        const path = this.getPath().join('/');
        console.log('open current path', path);
        this.openInEditor(path);
    }

    getResourceListActions(resourceList, relation, action?) {
        const actions = resourceList.getAllItems()
            .map((resource) => {
                const { identifier, label } = this.resourceConfig.get(relation);
                return {
                    id: resource[identifier],
                    title: resource[label] || '- no title -',
                    data: resource,
                    action: (item, bar) => {
                        if (action) {
                            action(item.getBody().data, bar)
                        } else {
                            this.openCurrentPath();
                        }
                    }
                };
            });
        return actions;
    }

    loadApiRelationActions(api, actionbar, action?) {
        const actions = Object.keys(api.getAvailableRelations()).map(relationName => ({
            id: relationName,
            title: relationName,
            relation: relationName,
            action: (item) => {
                // console.log('selected sub relation', relationName, api);
                this.loadResourceListActions(api, relationName, actionbar, action);
            }
        }));
        actionbar.loadActions(actions);
    }

    loadResourceListActions(api, relation, actionbar, action?) {
        const loading = api.resourceList(relation)
            .then(list => {
                return this.getResourceListActions(list, relation, action);
            }).then(actions => {
                if (actions) {
                    actionbar.loadActions(actions);
                }
                return actions || [];
            }).catch(error => {
                this.notificationService.emit({
                    title: 'Error while loading Resources',
                    error
                })
            });
        if (actionbar.dropdownLoader) {
            actionbar.dropdownLoader.wait(loading);
        }
        return loading;
    }

    resourceAction({ relation, title, api, action, actionbar, add, path }:
        { relation, title, api, action?, actionbar?, add?, path?}) {
        return {
            id: path || relation,
            title: title,
            add,
            action: () => this.loadResourceListActions(
                api, relation, actionbar, action
            )
        }
    }
}
