"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const http_1 = require("@angular/http");
const list_component_1 = require("./list.component");
const list_items_component_1 = require("./list-items/list-items.component");
const list_header_component_1 = require("./list-header/list-header.component");
const group_pipe_1 = require("./group.pipe");
const pagination_component_1 = require("./pagination/pagination.component");
const form_module_1 = require("../form/form.module");
const core_1 = require("@angular/core");
class ListModule {
}
ListModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [
                    list_component_1.ListComponent,
                    list_items_component_1.ListItemsComponent,
                    list_header_component_1.ListHeaderComponent,
                    pagination_component_1.PaginationComponent,
                    group_pipe_1.GroupPipe,
                ],
                imports: [
                    common_1.CommonModule,
                    http_1.HttpModule,
                    form_module_1.FormModule,
                ],
                exports: [
                    list_component_1.ListComponent,
                    list_items_component_1.ListItemsComponent,
                    list_header_component_1.ListHeaderComponent,
                    pagination_component_1.PaginationComponent,
                    group_pipe_1.GroupPipe,
                    form_module_1.FormModule,
                ],
                providers: []
            },] },
];
/** @nocollapse */
ListModule.ctorParameters = () => [];
exports.ListModule = ListModule;
//# sourceMappingURL=list.module.js.map