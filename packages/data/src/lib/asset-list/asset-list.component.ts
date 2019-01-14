import { Component, OnInit } from '@angular/core';
import { ResourceListComponent } from '../resource-list/resource-list.component';

@Component({
    selector: 'ec-asset-list',
    templateUrl: './asset-list.component.html'
})

export class AssetListComponent extends ResourceListComponent implements OnInit {
    ngOnInit() {
    }
}
