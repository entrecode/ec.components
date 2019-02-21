import { Component } from '@angular/core';
import { SdkService, ResourceConfig, AdminEntryInputComponent, CrudConfig } from '@ec.components/data';
import { SymbolService } from '@ec.components/ui';
import DataManagerResource from 'ec.sdk/lib/resources/datamanager/DataManagerResource';
import Resource from 'ec.sdk/lib/resources/Resource';

@Component({
    selector: 'ec-resource-crud-demo',
    templateUrl: './resource-crud-demo.component.html',
})
export class ResourceCrudDemoComponent {
    crudConfig: CrudConfig<Resource> = {
        selectMode: false,
        methods: ['get', 'put'] /** , 'post', 'delete' */
    };
    datamanager: DataManagerResource;
    constructor(public sdk: SdkService, public resourceConfig: ResourceConfig, public symbolService: SymbolService) {
        this.init();
    }

    async init() {
        const datamanager = await this.sdk.useDatamanager('83cc6374').then(dm => dm.getDataManagerResource());
        console.log('datamanager', datamanager);
        this.crudConfig = {
            identifier: 'accountID',
            label: 'email',
            disableSelectSwitch: true,
            methods: ['get', 'delete'],
            fields: {
                title: {
                    label: 'Title',
                    view: 'string',
                    immutable: true,
                },
                accountID: {
                    label: 'ID',
                    view: 'string',
                    immutable: true,
                    hideInList: true
                },
                email: {
                    label: this.symbolService.resolve('field.label.email'),
                    view: 'string',
                    filterable: true,
                    sortable: true,
                    immutable: true,
                    hideInList: true
                },
                isAnonymous: {
                    label: 'Anonymous',
                    view: 'boolean',
                    resolve: (account) => !account.email,
                    form: false,
                },
                hasPassword: {
                    label: this.symbolService.resolve('dmAccount.field.label.hasPassword'),
                    view: 'boolean',
                    readOnly: true,
                    immutable: true,
                    hideInList: true
                },
                pending: {
                    label: this.symbolService.resolve('dmAccount.field.label.pending'),
                    view: 'boolean',
                    readOnly: true,
                    immutable: true,
                },
                roles: {
                    label: 'Roles',
                    input: AdminEntryInputComponent,
                    type: 'resources',
                    view: 'tags',
                    api: datamanager,
                    relation: 'role',
                    filterable: true,
                    display: (roles = []) => roles.map(role => role.name),
                    solo: true,
                    filterOperator: 'any',
                    nestedCrudConfig: {
                        /* disableListPop: true */
                    }
                }
            }
        };
        this.datamanager = datamanager;
    }
}
