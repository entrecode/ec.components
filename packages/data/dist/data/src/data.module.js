"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const ui_module_1 = require("../../ui/src/ui.module");
const model_config_service_1 = require("./model-config/model-config.service");
const crud_service_1 = require("./crud/crud.service");
const default_entry_input_component_1 = require("./entry-form/default-entry-input.component");
const entry_list_component_1 = require("./entry-list/entry-list.component");
const entry_component_1 = require("./entry/entry.component");
const entries_component_1 = require("./entries/entries.component");
const entry_form_component_1 = require("./entry-form/entry-form.component");
const crud_component_1 = require("./crud/crud.component");
const default_entry_output_component_1 = require("./entry-form/default-entry-output.component");
const entry_select_component_1 = require("./entry-select/entry-select.component");
const type_config_service_1 = require("./model-config/type-config.service");
const datamanager_list_component_1 = require("./datamanager-list/datamanager-list.component");
const resource_list_component_1 = require("./resource-list/resource-list.component");
const model_list_component_1 = require("./model-list/model-list.component");
const data_routing_1 = require("./data.routing");
const editor_component_1 = require("./editor.component");
const sdk_module_1 = require("./sdk/sdk.module");
const files_module_1 = require("./files/files.module");
class DataModule {
    constructor() {
    }
    static forEnvironment(environment) {
        return {
            ngModule: DataModule,
            providers: [
                {
                    provide: 'environment',
                    useValue: Object.assign({
                        environment: 'live'
                    }, environment)
                }
            ]
        };
    }
}
DataModule.decorators = [
    { type: core_1.NgModule, args: [{
                entryComponents: [
                    default_entry_input_component_1.DefaultEntryInputComponent,
                    default_entry_output_component_1.DefaultEntryOutputComponent,
                    datamanager_list_component_1.DatamanagerListComponent,
                    model_list_component_1.ModelListComponent,
                    resource_list_component_1.ResourceListComponent,
                    entry_select_component_1.EntrySelectComponent,
                    editor_component_1.EditorComponent,
                ],
                declarations: [
                    entry_list_component_1.EntryListComponent,
                    entry_component_1.EntryComponent,
                    entries_component_1.EntriesComponent,
                    entry_form_component_1.EntryFormComponent,
                    datamanager_list_component_1.DatamanagerListComponent,
                    model_list_component_1.ModelListComponent,
                    resource_list_component_1.ResourceListComponent,
                    default_entry_input_component_1.DefaultEntryInputComponent,
                    default_entry_output_component_1.DefaultEntryOutputComponent,
                    crud_component_1.CrudComponent,
                    entry_select_component_1.EntrySelectComponent,
                    editor_component_1.EditorComponent,
                ],
                imports: [
                    data_routing_1.DataRoutingModule,
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    ui_module_1.UiModule,
                    sdk_module_1.SdkModule,
                    files_module_1.FilesModule,
                ],
                exports: [
                    entry_list_component_1.EntryListComponent,
                    entry_component_1.EntryComponent,
                    entries_component_1.EntriesComponent,
                    entry_form_component_1.EntryFormComponent,
                    crud_component_1.CrudComponent,
                    entry_select_component_1.EntrySelectComponent,
                    datamanager_list_component_1.DatamanagerListComponent,
                    model_list_component_1.ModelListComponent,
                    resource_list_component_1.ResourceListComponent,
                    router_1.RouterModule,
                    editor_component_1.EditorComponent,
                    sdk_module_1.SdkModule,
                    files_module_1.FilesModule,
                ],
                providers: [
                    crud_service_1.CrudService,
                    type_config_service_1.TypeConfigService,
                    model_config_service_1.ModelConfigService,
                    {
                        provide: 'environment',
                        useValue: {
                            environment: 'live'
                        }
                    }
                ],
            },] },
];
/** @nocollapse */
DataModule.ctorParameters = () => [];
exports.DataModule = DataModule;
//# sourceMappingURL=data.module.js.map