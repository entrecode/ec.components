import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { LoaderComponent } from '@ec.components/ui';
import { CrudConfig } from '@ec.components/data/src/crud/crud-config.interface';
import DMAssetResource from 'ec.sdk/lib/resources/publicAPI/DMAssetResource';
import PublicAssetResource from 'ec.sdk/lib/resources/publicAPI/PublicAssetResource';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import { UploadComponent } from '@ec.components/data/src/files';
import { Upload } from '@ec.components/data/src/files/file.service';

@Component({
    selector: 'ec-upload-select',
    templateUrl: './upload-select.component.html'
})

export class UploadSelectComponent implements OnInit {
    @Input() readOnly: boolean;
    @Input() custom: boolean;
    @Input() disableDrop: boolean;
    @Input() assetGroupID: string;
    @Input() loader: LoaderComponent;
    /** emits when the group has been set from the upload pop */
    @Output() groupChanged: EventEmitter<string> = new EventEmitter();
    /** Emits when an upload is complete. */
    @Output() uploaded: EventEmitter<Upload> = new EventEmitter();
    @Output() browse: EventEmitter<void> = new EventEmitter();
    @Input() config: CrudConfig<DMAssetResource | PublicAssetResource>;
    /** The nested upload component */
    @ViewChild(UploadComponent) uploader: UploadComponent;
    /** The Url to upload from */
    urlsToUpload = '';
    /** Wether or not the url input should be visible */
    showUrlInput = false;
    /** The event that focuses the url input */
    public focusEvent: EventEmitter<boolean> = new EventEmitter();

    constructor(public symbol: SymbolService) { }

    ngOnInit() { }

    /** Sets the asset group to upload to */
    setGroup(group) {
        this.assetGroupID = group;
        this.groupChanged.emit(group);
    }

    toggleUrlInput() {
        this.showUrlInput = !this.showUrlInput;
        setTimeout(() => {
            this.focusEvent.emit(true);
        })
    }

    uploadFromUrls(urls, e) {
        this.uploader.uploadFiles(urls, e).then(() => {
            this.urlsToUpload = '';
            this.showUrlInput = false;
        });
    }
    triggerUpload(e) {
        this.uploader.trigger(e);
    }
}
