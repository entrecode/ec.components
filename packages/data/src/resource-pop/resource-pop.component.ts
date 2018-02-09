import { Component, Input, OnInit, ViewChild } from '@angular/core';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { Router, ActivatedRoute } from '@angular/router';
import Resource from 'ec.sdk/lib/resources/Resource';
import Core from 'ec.sdk/lib/Core';
import { CrudConfig } from '../crud/crud-config.interface';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { AuthService } from '../auth/auth.service';
import { OnChanges, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SdkService } from '../sdk/sdk.service';
import { FormComponent } from '../../../ui/src/form/form.component';

/** Entry Pop is an extension of Pop component to host an entry-form.
 * You can use it like a normal pop but with the extra handling of an entry form inside.
 * You can call edit with an entry object to edit an entry, or just call show.
 * It is also possible to bind an entry directly which will then be bound to the form.
 * */
@Component({
    selector: 'ec-resource-pop',
    templateUrl: './resource-pop.component.html',
    styleUrls: ['./resource-pop.component.scss']
})

export class ResourcePopComponent extends PopComponent {
    /** CrudConfig for customizing the entry-form and the pop.*/
    @Input() config: CrudConfig<Resource> = {};
    /** The entry form inside the view */
    @ViewChild(ResourceFormComponent) form: ResourceFormComponent;
    /** The API Connector that possesses the resource list, see https://entrecode.github.io/ec.sdk/#api-connectors */
    @Input() api: Core; // sdk api connector
    /** The name of the resource. If given, the generic ListResource loading will be used (api.resourceList) */
    @Input() relation: string;
    /** The entry that should be used in the form. Is also set by edit.*/
    @Input() resource: Resource;
    /** Route that should be headed to when a resource is edited. Navigates to route/:entryID */
    /* @Input() editRoute: string; */
    /** Route that should be headed to when a resource is created. */
    /* @Input() createRoute: string; */

    constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private sdk: SdkService) {
        super();
    }

    /** Returns true if the given method is part of the methods array (or if there is no methods array) */
    public hasMethod(method: string) {
        return this.config.methods && this.config.methods.indexOf(method) !== -1;
    }

    /** Determines if the current form can be saved, based on the allowed method (edit/update). */
    public maySave(form: ResourceFormComponent) {
        const edit = form.isEditing();
        return (!edit && this.hasMethod('post')) || (edit && this.hasMethod('put'))
    }

    /*   public getUrlUntil(url: string, stop: string[]): string {
        const parts = url.split('/');
        return parts.reduce((state, part) => {
          if (state.done || [this.editRoute, this.createRoute].includes(part)) {
            state.done = true;
            return state;
          }
          state.url += part;
          return state;
        }, { url: '', done: false }).url;
      } */
    /** escapes the given string to be usable in a regex */
    escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }

    pathRegExp(path) {
        return path.split('/').map(subpath => this.escapeRegExp(subpath)).join('/');
    }

    /** Edit the given entry. */
    edit(resource: Resource) {
        /* if (this.editRoute) {
            const matcher = '(' + this.pathRegExp(this.editRoute) + '|' + this.pathRegExp(this.createRoute) + ').*';
            const trimmed = this.router.url.replace(new RegExp(matcher, 'g'), '');
            this.router.navigate([trimmed, this.editRoute, entry.id]);
        } */
        this.resource = resource;
        this.show();
    }

    /** Opens the pop after deleting the current bound entry from the instance. */
    create() {
        delete this.resource;
        /* if (this.createRoute) {
            const matcher = '(' + this.pathRegExp(this.editRoute) + '|' + this.pathRegExp(this.createRoute) + ').*';
            const trimmed = this.router.url.replace(new RegExp(matcher, 'g'), '');
            this.router.navigate([trimmed, this.createRoute]);
        } */
        if (this.form) { // clears form if already used before
            this.form.create();
        }
        this.show();
    }

    /** Initialize the allowed methods to determine which buttons should be shown. */
    initMethods(form: ResourceFormComponent) {
        if (!form || !this.relation) {
            return
        }
        const variables = form.config.identifier ? {
            [form.config.identifier]: form.form.id()
        } : {};
        // TODO: find a way to resolve parent resource variables e.g. dm:<dataManagerID>:model:entries:<modelID>
        this.auth.getAllowedResourceMethods(this.relation, variables) // this.config.methods
            .then((methods) => {
                this.config.methods = methods;
            });
    }

    /** Logs the current form (Developer help). */
    private log(form) {
        console.dir(form);
    }
}
