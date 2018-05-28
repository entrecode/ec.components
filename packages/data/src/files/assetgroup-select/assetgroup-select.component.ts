import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from '..';

@Component({
    selector: 'ec-assetgroup-select',
    templateUrl: './assetgroup-select.component.html',
})

export class AssetgroupSelectComponent implements OnInit {
    @Input() placeholder = 'select assetgroup..';
    @Input() assetGroupID: string;
    @Input() assetGroups: string[];
    @Input() hideLegacy: boolean;
    @Output() groupChanged: EventEmitter<string> = new EventEmitter();

    constructor(
        public fileService: FileService
    ) { }

    ngOnInit() {
        this.fileService.assetGroupList().then(assetGroups => this.assetGroups = assetGroups);
    }
}
