import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LoaderService, NotificationsService, PopComponent } from '@ec.components/ui';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import Resource from 'ec.sdk/lib/resources/Resource';
import { ResourceService } from '../resource-config/resource.service';
/** This component can be used to delete all kinds of resources with a confirmation pop.
 *
 * ```html
 * <ec-resource-pop (deleted)="runAway()" #pop></ec-resource-pop>
 * <a (click)="pop.confirm(SomeResource)">LÖSCHEN!</a>
 * ```
 *
 */
@Component({
    selector: 'ec-resource-delete-pop',
    templateUrl: './resource-delete-pop.component.html',
})
export class ResourceDeletePopComponent {
    /* The current value of the confirmation input */
    confirmInput = '';
    /** The pop inside the view. */
    @ViewChild(PopComponent) pop: PopComponent;
    /** The resource to delete */
    @Input() resource: Resource;
    /** The relation where it happened */
    @Input() relation: string;
    /** If given, an input will be shown that expects the string to be entered before being able to press delete */
    @Input() safetyWord: string;
    /** Output that is after the deletion was successful. */
    @Output() deleted: EventEmitter<any> = new EventEmitter();
    /** Injects SymbolService and LoaderService */
    constructor(public symbol: SymbolService,
        public loader: LoaderService,
        private resourceService: ResourceService,
        public notificationService: NotificationsService) { }
    /** The delete method calls del() of the given resource. You can also pass a resource to delete directly to set it.  */
    delete(resource: Resource = this.resource) {
        if (!resource) {
            console.error('cannot delete: no resource given!');
            return;
        }
        if (!this.canDelete()) {
            console.warn('not confirmed!');
            return;
        }
        const deletion = this.resourceService.del(this.relation, this.resource)
            .then(res => {
                this.notificationService.emit({
                    title: this.symbol.resolve('success.delete'),
                    type: 'success',
                });
                this.hide()
                this.deleted.next(res);
            }).catch(error => {
                this.notificationService.emit({
                    title: this.symbol.resolve('error.delete'),
                    error
                });
            });
        this.loader.wait(deletion);
    }

    canDelete() {
        return !this.safetyWord || this.safetyWord === this.confirmInput;
    }
    /** The confirm method sets a given resource and shows the confirmation pop. */
    confirm(resource: Resource = this.resource) {
        this.resource = resource;
        this.pop.show();
    }

    hide() {
        this.pop.hide();
        this.confirmInput = '';
    }
}
