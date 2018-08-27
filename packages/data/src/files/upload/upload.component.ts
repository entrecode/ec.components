import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LoaderComponent, LoaderService, NotificationsService, WithLoader } from '../../../../ui';
import { Notification } from '../../../../ui/src/notifications/notification';
import { WithNotifications } from '../../../../ui/src/notifications/with-notifications.interface';
import { PopComponent } from '../../../../ui/src/pop/pop.component';
import { SymbolService } from '../../../../ui/src/symbol/symbol.service';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import { SdkService } from '../../sdk/sdk.service';
import { FileService, Upload } from '../file.service';
import { FileOptions } from '../file.service';

/** This component will render an input field to upload files to the datamanager. TODO: demo */
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
  /** If true, a pop to rename files + customize flags will appear before uploading. */
  @Input() custom: boolean;
  /** Upload options */
  @Input() options: FileOptions = Object.assign({}, this.fileService.defaultOptions);
  /** The api to use for the upload. Defaults to sdk.api */
  @Input() api: PublicAPI;
  /** Emits when an upload is complete. */
  @Output() success: EventEmitter<Upload> = new EventEmitter();
  /** emits when the group has been set from the upload pop */
  @Output() groupChanged: EventEmitter<string> = new EventEmitter();
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
  trigger(e) {
    if (!this.fileInput) {
      console.error('cannot trigger upload: file input element not found!');
      return;
    }
    /* this.clear(); */
    this.fileInput.nativeElement.click();
  }

  /** Sets the asset group to upload to */
  setGroup(group) {
    this.assetGroupID = group;
    this.groupChanged.emit(group);
  }

  /** Uploads the files from the input event. Handles loader and notifications. */
  change(e, api = this.sdk.api) {
    if (!e || !e.target || !e.target.files || !e.target.files.length) {
      return;
    }
    return this.uploadFiles(e.target.files, e, api);
  }

  /** clears the file input */
  clear() {
    if (!this.fileInput) {
      return;
    }
    this.fileInput.nativeElement.value = ''; // clear input to eventually trigger change on same file
  }

  uploadFiles(files, e, api = this.sdk.api) {
    files = typeof files === 'string'
      ? files.split('\n').map(url => ({ name: url, url }))
      : files;
    if (files[0].url && this.assetGroupID === 'legacyAsset') {
      delete this.assetGroupID;
    }
    this.filesToUpload = files;
    e.preventDefault();
    e.stopPropagation();
    if (this.custom || !this.assetGroupID) {
      this.event = e;
      this.pop.show();
      return Promise.resolve();
    }
    return this.upload(files, api);
  }

  /** Triggers upload of current selected files */
  upload(files, api = this.sdk.api) {
    this.uploadPromise = (this.assetGroupID !== 'legacyAsset' ?
      this.fileService.uploadAssets(files, this.assetGroupID, this.options, api) :
      this.fileService.uploadFiles(files))
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
