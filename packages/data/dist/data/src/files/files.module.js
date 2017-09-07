"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { BrowserModule } from '@angular/platform-browser';
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const core_1 = require("@angular/core");
const asset_list_component_1 = require("./asset-list/asset-list.component");
const ui_module_1 = require("@ec.components/ui/src/ui.module");
const asset_select_component_1 = require("./asset-select/asset-select.component");
const file_service_1 = require("./file.service");
const asset_input_component_1 = require("./asset-input/asset-input.component");
const upload_component_1 = require("./upload/upload.component");
const sdk_module_1 = require("../sdk/sdk.module");
class FilesModule {
}
FilesModule.decorators = [
    { type: core_1.NgModule, args: [{
                entryComponents: [
                    asset_list_component_1.AssetListComponent,
                    asset_select_component_1.AssetSelectComponent,
                    asset_input_component_1.AssetInputComponent,
                    upload_component_1.UploadComponent,
                ],
                declarations: [
                    asset_list_component_1.AssetListComponent,
                    asset_select_component_1.AssetSelectComponent,
                    asset_input_component_1.AssetInputComponent,
                    upload_component_1.UploadComponent,
                ],
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    ui_module_1.UiModule,
                    sdk_module_1.SdkModule,
                ],
                exports: [
                    asset_list_component_1.AssetListComponent,
                    asset_select_component_1.AssetSelectComponent,
                    asset_input_component_1.AssetInputComponent,
                    upload_component_1.UploadComponent,
                    sdk_module_1.SdkModule,
                ],
                providers: [
                    file_service_1.FileService
                ],
            },] },
];
/** @nocollapse */
FilesModule.ctorParameters = () => [];
exports.FilesModule = FilesModule;
//# sourceMappingURL=files.module.js.map