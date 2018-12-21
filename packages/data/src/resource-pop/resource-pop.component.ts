import { Component, Input, OnInit, ViewChild, Output, EventEmitter, HostBinding, ElementRef, ChangeDetectorRef } from '@angular/core';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { Router, ActivatedRoute } from '@angular/router';
import Resource from 'ec.sdk/lib/resources/Resource';
import Core from 'ec.sdk/lib/Core';
import { CrudConfig } from '../crud/crud-config.interface';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { AuthService } from '../auth/auth.service';
import { SdkService } from '../sdk/sdk.service';
import { PopService } from '@ec.components/ui/src/pop/pop.service';
import { ResourceForm } from '../resource-form/resource-form';
import { Form } from '@ec.components/core';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import { FormService } from '@ec.components/ui/src/form/form.service';

/** Entry Pop is an extension of Pop component to host an entry-form.
 * You can use it like a normal pop but with the extra handling of an entry form inside.
 * You can call edit with an entry object to edit an entry, or just call show.
 * It is also possible to bind an entry directly which will then be bound to the form.
 * */
@Component({
    selector: 'ec-resource-pop',
    templateUrl: './resource-pop.component.html',
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
    /** Emits when the entry-form is submitted. */
    @Output() submitted: EventEmitter<ResourceForm> = new EventEmitter();
    /** Emits when the resource has been deleted. */
    @Output() deleted: EventEmitter<ResourceForm | Form<Resource>> = new EventEmitter();
    /** Set host class to make sure the type is used */
    @HostBinding('class') class = 'toast-wrapper';

    constructor(protected popService: PopService,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private sdk: SdkService,
        public formService: FormService,
        public symbol: SymbolService,
        public elementRef: ElementRef,
        public cdr: ChangeDetectorRef) {
        super(popService, elementRef, cdr);
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
    edit(resource: Resource, config?: CrudConfig<Resource>) {
        if (config) {
            this.config = Object.assign(this.config, config);
        }
        /* if (this.editRoute) {
            const matcher = '(' + this.pathRegExp(this.editRoute) + '|' + this.pathRegExp(this.createRoute) + ').*';
            const trimmed = this.router.url.replace(new RegExp(matcher, 'g'), '');
            this.router.navigate([trimmed, this.editRoute, entry.id]);
        } */
        this.editResource(resource).then((preparedResource: Resource) => {
            this.resource = preparedResource;
            this.show();
        });
    }

    editResource(resource: Resource): Promise<Resource> {
        if (this.config && this.config.onEdit) {
            return Promise.resolve(this.config.onEdit(resource));
        }
        return Promise.resolve(resource);
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
        this.auth.getAllowedResourceMethods(this.relation, variables, this.config.methods) // this.config.methods
            .then((methods) => this.config.methods = methods);
    }


    /** Fires when the resource has been deleted. */
    private deletedResource() {
        this.hide();
        this.deleted.emit(this.form.form);
    }

    /** Logs the current form (Developer help). */
    private log(form) {
        console.dir(form);
    }
    /** Is called when the nested form was submitted */
    formSubmitted(form: ResourceForm) {
        this.submitted.next(form);
        if (!this.config.keepPopOpen) {
            this.hide();
        }
    }

    /** Returns header for current form */
    getHeader(form) {
        const label = this.config.singularLabel || form.relation || this.symbol.resolve('resource.generic');
        return this.formService.getFormLabel(form, label);
    }
}

