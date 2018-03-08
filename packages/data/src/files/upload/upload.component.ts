import { PopComponent } from './../../../../ui/src/pop/pop.component';
import { FileOptions } from './../file.service';
import { Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { SdkService } from '../../sdk/sdk.service';
import { FileService, Upload } from '../file.service';
import { LoaderComponent, WithLoader, LoaderService, NotificationsService } from '@ec.components/ui';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import PublicAPI from 'ec.sdk/lib/PublicAPI';

/** This component will render an input field to upload files to the datamanager. */
@Component({
  selector: 'ec-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent implements WithLoader {
  event: any;
  uploadPromise: Promise<Upload | void>;
  public filesToUpload: any;
  /** The input placeholder*/
  @Input() placeholder: string;
  /** The loader that should be used while uploading*/
  @Input() loader: LoaderComponent;
  /** The asset group to upload into. If not defined, old assets will be used! */
  @Input() assetGroup: string;
  /** If true, a pop to rename files + customize flags will appear before uploading. */
  @Input() custom: boolean;
  /** Upload options */
  @Input() options: FileOptions;
  /** The api to use for the upload. Defaults to sdk.api */
  @Input() api: PublicAPI;
  /** Emits when an upload is complete. */
  @Output() success: EventEmitter<Upload> = new EventEmitter();
  /** Reference to the input[type=file] element */
  @ViewChild('fileInput') fileInput: ElementRef;
  /** Pop child for new asset options. */
  @ViewChild(PopComponent) pop: PopComponent;

  constructor(private sdk: SdkService,
    private fileService: FileService,
    private loaderService: LoaderService,
    private notificationService: NotificationsService,
    private symbol: SymbolService) {
  }
  /** opens the system upload window by triggering the input */
  trigger() {
    if (!this.fileInput) {
      console.error('cannot trigger upload: file input element not found!');
      return;
    }
    this.fileInput.nativeElement.click();
  }
  // https://datamanager.cachena.entrecode.de/a/b2be0156/test
  // https://datamanager.cachena.entrecode.de/a/b2be0156/test?page=1&size=20

  /** Uploads the files from the input event. Handles loader and notifications. */
  change(e, api = this.sdk.api) {
    if (this.custom) {
      this.filesToUpload = e.target.files;
      this.options = this.options || {
        preserveFilenames: true,
        includeAssetIDInPath: true,
        ignoreDuplicates: false,
        customNames: []
      };
      this.event = e;
      this.pop.show();
      return;
    }
    return this.upload(e, api);
  }

  upload(e, api = this.sdk.api) {
    this.uploadPromise = (this.assetGroup ?
      this.fileService.uploadAssets(e, this.assetGroup, this.options, api) :
      this.fileService.uploadFiles(e))
      .then((_upload) => {
        this.success.emit(_upload);
        this.notificationService.emit({
          title: this.symbol.resolve('success.upload'),
          type: 'success'
        });
        this.pop.hide();
        return _upload;
      }).catch((err) => {
        console.error(err);
        this.notificationService.emit({
          title: this.symbol.resolve('error.upload'),
          error: err,
          sticky: true
        });
      });
    this.loaderService.wait(this.uploadPromise, this.loader);
    this.uploadPromise.then(() => {
      delete this.uploadPromise;
    })
    return this.uploadPromise;
  }
}
