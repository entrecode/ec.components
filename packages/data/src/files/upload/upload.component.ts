import { Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { SdkService } from '../../sdk/sdk.service';
import { FileService, Upload } from '../file.service';
import { LoaderComponent, WithLoader, LoaderService, NotificationsService } from '@ec.components/ui';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';

/** This component will render an input field to upload files to the datamanager. */
@Component({
  selector: 'ec-upload',
  template: `<input type="file" (change)="upload($event)" multiple #fileInput>`,
})
export class UploadComponent implements WithLoader {
  /** The input placeholder*/
  @Input() placeholder: string;
  /** The loader that should be used while uploading*/
  @Input() loader: LoaderComponent;
  /** Emits when an upload is complete. */
  @Output() success: EventEmitter<Upload> = new EventEmitter();
  /** Reference to the input[type=file] element */
  @ViewChild('fileInput') fileInput: ElementRef;

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

  /** Uploads the files from the input event. Handles loader and notifications. */
  upload(e) {
    const upload = this.fileService.uploadFiles(e)
      .then((_upload) => {
        this.success.emit(_upload);
        this.notificationService.emit({
          title: this.symbol.resolve('sucess.upload'),
          type: 'success'
        });
      }).catch((err) => {
        console.log('error', err);
        this.notificationService.emit({
          title: this.symbol.resolve('error.upload'),
          error: err
        });
      });
    this.loaderService.wait(upload, this.loader);
    return upload;
  }
}


