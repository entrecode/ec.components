import { Component, EventEmitter, Input, Output, ViewChild, HostBinding, ElementRef } from '@angular/core';
import { LoaderService, NotificationsService, PopComponent } from '@ec.components/ui';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import Resource from 'ec.sdk/lib/resources/Resource';
import { ResourceService } from '../resource-config/resource.service';
import { PopService } from '@ec.components/ui/src/pop/pop.service';
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
export class ResourceDeletePopComponent extends PopComponent {
    /* The current value of the confirmation input */
    confirmInput = '';
    @HostBinding('class') type = 'dialog-wrapper';
    /** The question inside the pop */
    @Input() question: string;
    /** The label for confirmation */
    @Input() yes: string;
    /** The label for canceling */
    @Input() no: string;
    /** The resource to delete */
    @Input() resource: Resource;
    /** The relation where it happened */
    @Input() relation: string;
    /** If given, an input will be shown that expects the string to be entered before being able to press delete */
    @Input() safetyWord: string;
    /** Output that is after the deletion was successful. */
    @Output() deleted: EventEmitter<any> = new EventEmitter();
    /** to focus safety word input */
    public focusEvent: EventEmitter<boolean> = new EventEmitter();
    /** Injects SymbolService and LoaderService */
    constructor(public symbol: SymbolService,
        public loader: LoaderService,
        private resourceService: ResourceService,
        public notificationService: NotificationsService,
        public popService: PopService,
        public elementRef: ElementRef) {
        super(popService, elementRef);
    }
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
        this.show();
    }

    show() {
        super.show();
        setTimeout(() => {
            this.focusEvent.emit(true);
        });
    }

    hide() {
        super.hide();
        this.confirmInput = '';
    }
}
