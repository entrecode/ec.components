"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const sdk_service_1 = require("../../sdk/sdk.service");
const file_service_1 = require("../file.service");
const loader_service_1 = require("@ec.components/ui/src/loader/loader.service");
const notifications_service_1 = require("@ec.components/ui/src/notifications/notifications.service");
/** This component will render an input field to upload files to the datamanager. */
class UploadComponent {
    constructor(sdk, fileService, loaderService, notificationService) {
        this.sdk = sdk;
        this.fileService = fileService;
        this.loaderService = loaderService;
        this.notificationService = notificationService;
        /** Emits when an upload is complete. */
        this.success = new core_1.EventEmitter();
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
UploadComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-upload',
                template: `<input type="file" (change)="upload($event)" multiple>`,
            },] },
];
/** @nocollapse */
UploadComponent.ctorParameters = () => [
    { type: sdk_service_1.SdkService, },
    { type: file_service_1.FileService, },
    { type: loader_service_1.LoaderService, },
    { type: notifications_service_1.NotificationsService, },
];
UploadComponent.propDecorators = {
    'placeholder': [{ type: core_1.Input },],
    'loader': [{ type: core_1.Input },],
    'success': [{ type: core_1.Output },],
};
exports.UploadComponent = UploadComponent;
//# sourceMappingURL=upload.component.js.map