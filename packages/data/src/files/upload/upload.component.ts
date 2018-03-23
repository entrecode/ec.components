import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { FileOptions } from './../file.service';
import { Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { SdkService } from '../../sdk/sdk.service';
import { FileService, Upload } from '../file.service';
import { LoaderComponent, WithLoader, LoaderService, NotificationsService } from '@ec.components/ui';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import { WithNotifications } from '@ec.components/ui/src/notifications/with-notifications.interface';
import { Notification } from '@ec.components/ui/src/notifications/notification';

/** This component will render an input field to upload files to the datamanager. */
@Component({
  selector: 'ec-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent implements WithLoader, WithNotifications {
  event: any;
  uploadPromise: Promise<Upload | void>;
  public filesToUpload: any;
  /** The input placeholder*/
  @Input() placeholder: string;
  /** The loader that should be used while uploading*/
  @Input() loader: LoaderComponent;
  /** The asset group to upload into. If not defined, old assets will be used! */
  @Input() assetGroupID: string;
  /** The asset group to upload into. If not defined, old assets will be used! DEPRECATED! */
  @Input() assetGroup: string;
  /** If true, a pop to rename files + customize flags will appear before uploading. */
  @Input() custom: boolean;
  /** Upload options */
  @Input() options: FileOptions = {
    preserveFilenames: true,
    includeAssetIDInPath: true,
    ignoreDuplicates: false,
    customNames: []
  };
  /** The api to use for the upload. Defaults to sdk.api */
  @Input() api: PublicAPI;
  /** Emits when an upload is complete. */
  @Output() success: EventEmitter<Upload> = new EventEmitter();
  /** Reference to the input[type=file] element */
  @ViewChild('fileInput') fileInput: ElementRef;
  /** Pop child for new asset options. */
  @ViewChild(PopComponent) pop: PopComponent;
  /** Error Notifications */
  notifications: Notification[] = [];

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
    /* this.clear(); */
    this.fileInput.nativeElement.click();
  }

  /** Uploads the files from the input event. Handles loader and notifications. */
  change(e, api = this.sdk.api) {
    if (!e || !e.target || !e.target.files || !e.target.files.length) {
      return;
    }
    this.filesToUpload = e.target.files;
    if (this.custom) {
      this.event = e;
      this.pop.show();
      return;
    }
    return this.upload(e, api);
  }

  /** clears the file input */
  clear() {
    if (!this.fileInput) {
      return;
    }
    this.fileInput.nativeElement.value = ''; // clear input to eventually trigger change on same file
  }

  /** Triggers upload of current selected files */
  upload(e, api = this.sdk.api) {
    const assetGroupID = this.assetGroupID || this.assetGroup;
    this.uploadPromise = (assetGroupID ?
      this.fileService.uploadAssets(e, assetGroupID, this.options, api) :
      this.fileService.uploadFiles(e))
      .then((_upload) => {
        this.success.emit(_upload);
        this.notificationService.emit({
          title: this.symbol.resolve('success.upload'),
          type: 'success',
          hide: this.notifications
        });
        this.pop.hide();
        return _upload;
      }).catch((err) => {
        console.error(err);
        this.notificationService.emit({
          title: this.symbol.resolve('error.upload'),
          error: err,
          sticky: true,
          hide: this.notifications,
          append: this.notifications
        });
      });
    this.loaderService.wait(this.uploadPromise, this.loader);
    this.uploadPromise.then(() => {
      delete this.uploadPromise;
    })
    return this.uploadPromise;
  }
}
