import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SdkService } from '../../sdk/sdk.service';
import { FileService, Upload } from '../file.service';
import { LoaderComponent } from '../../../ui/loader/loader.component';
import { LoaderService } from '../../../ui/loader/loader.service';
import { NotificationsService } from '../../../ui/notifications/notifications.service';

/** This component will render an input field to upload files to the datamanager. */
@Component({
  selector: 'ec-upload',
  template: `<input type="file" (change)="upload($event)" multiple>`,
})
export class UploadComponent {
  /** The input placeholder*/
  @Input() placeholder: string;
  /** The loader that should be used while uploading*/
  @Input() loader: LoaderComponent;
  /** Emits when an upload is complete. */
  @Output() success: EventEmitter<Upload> = new EventEmitter();

  constructor(private sdk: SdkService,
    private fileService: FileService,
    private loaderService: LoaderService,
    private notificationService: NotificationsService) {
  }

  /** Uploads the files from the input event. Handles loader and notifications. */
  upload(e) {
    const upload = this.fileService.uploadFiles(e)
    .then((upload) => {
      this.success.emit(upload);
      this.notificationService.emit({
        title: 'Upload erfolgreich',
        type: 'success'
      });
    }).catch((err) => {
      console.log('error', err);
      this.notificationService.emit({
        title: 'Fehler beim Upload',
        error: err
      });
    });
    this.loaderService.wait(upload, this.loader);
    return upload;
  }
}


