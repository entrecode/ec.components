import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import { PopComponent, LoaderService } from '@ec.components/ui';
import Resource from 'ec.sdk/lib/resources/Resource';
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
    styleUrls: ['./resource-delete-pop.component.scss']
})
export class ResourceDeletePopComponent {
    /** The pop inside the view. */
    @ViewChild(PopComponent) pop: PopComponent;
    /** The resource to delete */
    @Input() resource: Resource;
    /** Output that is after the deletion was successful. */
    @Output() deleted: EventEmitter<any> = new EventEmitter();
    /** Injects SymbolService and LoaderService */
    constructor(public symbol: SymbolService, public loader: LoaderService) { }
    /** The delete method calls del() of the given resource. You can also pass a resource to delete directly to set it.  */
    delete(resource: Resource = this.resource) {
        if (!resource) {
            console.error('cannot delete: no resource given!');
            return;
        }
        const deletion = this.resource.del().then(res => {
            this.pop.hide();
            this.deleted.next(res);
        });
        this.loader.wait(deletion);
    }
    /** The confirm method sets a given resource and shows the confirmation pop. */
    confirm(resource: Resource = this.resource) {
        this.resource = resource;
        this.pop.show();
    }
}