import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import { PopComponent, LoaderService } from '@ec.components/ui';
import Resource from 'ec.sdk/lib/resources/Resource';

@Component({
    selector: 'ec-resource-delete-pop',
    templateUrl: './resource-delete-pop.component.html',
    styleUrls: ['./resource-delete-pop.component.scss']
})
export class ResourceDeletePopComponent {
    @ViewChild(PopComponent) pop: PopComponent;
    @Input() resource: Resource;
    @Output() deleted: EventEmitter<any> = new EventEmitter();

    constructor(public symbol: SymbolService, public loader: LoaderService) { }

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

    confirm(resource: Resource = this.resource) {
        this.resource = resource;
        this.pop.show();
    }
}
