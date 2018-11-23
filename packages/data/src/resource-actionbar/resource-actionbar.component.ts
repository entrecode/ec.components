import { Component, OnInit, ElementRef, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { ActionbarComponent, Action, ActionFunction } from '@ec.components/ui/src/actionbar/actionbar.component';
import { SdkService } from '../..';
import { NotificationsService, ListComponent } from '@ec.components/ui';
import { ResourceConfig } from '../resource-config/resource-config.service';
import ListResource from 'ec.sdk/lib/resources/ListResource';
import Core from 'ec.sdk/lib/Core';
import { Item } from '@ec.components/core';

export interface ResourceActionbarState {
    api: Core,
    relation: string,
    actionbar: ActionbarComponent,
    action?: ActionFunction,
    options?: Object
};

@Component({
    selector: 'ec-resource-actionbar',
    templateUrl: '../../../ui/src/select/select.component.html', // TODO avoid relative paths
})

export class ResourceActionbarComponent extends ActionbarComponent implements OnInit {

    state: ResourceActionbarState;

    @Output() create: EventEmitter<string> = new EventEmitter();
    @Output() select: EventEmitter<Item<Action>> = new EventEmitter();

    @Input() actions: Action[];

    constructor(
        public notificationService: NotificationsService,
        public sdk: SdkService,
        public resourceConfig: ResourceConfig,
        public elementRef: ElementRef,
        public cdr: ChangeDetectorRef,
    ) {
        super(elementRef, cdr);
    }

    ngOnInit() {
        const state = {
            api: this.sdk.api,
            relation: 'tags'
        }
        const { api, relation } = state;
        this.sdk.ready.then(() => {
            this.loadResourceListActions({
                api,
                relation,
                actionbar: this
            });
        });
    }

    getResourceListActions(listResource: ListResource, relation: string, action?: ActionFunction): Action[] {
        const actions = listResource.getAllItems()
            .map((resource) => {
                const { identifier, label } = this.resourceConfig.get(relation);
                return {
                    id: resource[identifier],
                    title: resource[label] || '- no title -',
                    data: resource,
                    path: relation,
                    action: (item, bar) => {
                        if (action) {
                            action(item.getBody().data, bar)
                        } else {
                            console.log('no action specified..');
                        }
                    }
                };
            });
        return actions;
    }

    reload() {
        this.loadResourceListActions({
            ...this.state,
            options: {}
        });
    }

    loadResourceListActions(state: ResourceActionbarState = this.state, stack = true): Promise<Action[]> {
        const { api, relation, actionbar, action, options } = state;
        this.state = {
            ...this.state,
            ...state
        };
        const loading = api.resourceList(relation, options)
            .then(list => {
                return this.getResourceListActions(list, relation, action);
            }).then(actions => {
                if (actions) {
                    actionbar.loadActions(actions, stack);
                }
                return actions;
            }).catch(error => {
                this.notificationService.emit({
                    title: 'Error while loading Resources',
                    error
                });
            }).then(actions => actions || []);
        if (actionbar.dropdownLoader) {
            actionbar.dropdownLoader.wait(loading);
        }
        return loading;
    }

    resourceAction({ relation, title, api, action, actionbar, add, path }:
        {
            relation: string,
            title: string,
            api: Core,
            action?: ActionFunction,
            actionbar?: ActionbarComponent,
            add?: boolean,
            path?: string
        }) {
        return {
            id: path || relation,
            title: title,
            add,
            action: () => this.loadResourceListActions(
                { api, relation, actionbar, action }
            )
        }
    }

    filterDropdownList(listComponent: ListComponent<any>, query) {
        const paths = this.currentActions()
            .map(a => a.path)
            .filter((value, index, self) => self.indexOf(value) === index)
            .filter(v => !!v);
        if (!paths.length) {
            return super.filterDropdownList(listComponent, query);
        }
        const { identifier, label } = this.resourceConfig.get(this.state.relation);
        this.loadResourceListActions({
            ...this.state,
            options: {
                [label + '~']: { exact: query }
            }
        }, false).then((actions) => {
            if (actions.length === 0) {
                this.loadActions([{
                    title: `"${query}" erstellen`,
                    id: 'createnew',
                    select: false,
                    action: () => {
                        if (this.create.observers.length) {
                            this.create.emit(query);
                        } else {
                            const item = new Item({
                                id: Date.now() + '',
                                title: query,
                            }, this.config);
                            this.addItem(item);
                            this.searchbar.clear();
                            this.reload();
                        }
                    }
                }], false);
            }
        });

    }
}
