import { EventEmitter } from '@angular/core';
import { SdkService } from '../../sdk/sdk.service';
import { FileService, Upload } from '../file.service';
import { LoaderComponent } from '@ec.components/ui/src/loader/loader.component';
import { LoaderService } from '@ec.components/ui/src/loader/loader.service';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
/** This component will render an input field to upload files to the datamanager. */
export declare class UploadComponent {
    private sdk;
    private fileService;
    private loaderService;
    private notificationService;
    /** The input placeholder*/
    placeholder: string;
    /** The loader that should be used while uploading*/
    loader: LoaderComponent;
    /** Emits when an upload is complete. */
    success: EventEmitter<Upload>;
    constructor(sdk: SdkService, fileService: FileService, loaderService: LoaderService, notificationService: NotificationsService);
    /** Uploads the files from the input event. Handles loader and notifications. */
    upload(e: any): Promise<void>;
}
