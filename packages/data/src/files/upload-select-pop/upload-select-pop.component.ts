import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopComponent } from '@ec.components/ui';
import { Selection } from '@ec.components/core';
import { PopService } from '@ec.components/ui/src/pop/pop.service';
import PublicAssetResource from 'ec.sdk/lib/resources/publicAPI/PublicAssetResource';
import DMAssetResource from 'ec.sdk/lib/resources/publicAPI/DMAssetResource';

@Component({
    selector: 'ec-upload-select-pop',
    templateUrl: 'upload-select-pop.component.html'
})

export class UploadSelectPopComponent extends PopComponent {
    /** The assetGroupID that is used in the image picker */
    @Input() assetGroupID: string;
    /** Defines if the selection is solo. Defaults to true */
    @Input() solo = true;
    /** Output that emits when the asset selection changed */
    @Output() changed: EventEmitter<Selection<PublicAssetResource | DMAssetResource>> =
        new EventEmitter();

    constructor(public popService: PopService) {
        super(popService);
    }
}
