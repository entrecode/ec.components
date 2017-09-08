"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by felix on 23.05.17.
 */
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const file_service_1 = require("../file.service");
const select_component_1 = require("@ec.components/ui/src/form/select/select.component");
/** Shows assets of a selection and is able to pick new ones from a crud list */
class AssetSelectComponent extends select_component_1.SelectComponent {
    constructor(fileService) {
        super();
        this.fileService = fileService;
    }
    initValue(value = this.value) {
        this.value = value;
        if (!this.formControl) {
            this.formControl = new forms_1.FormControl(this.value || []);
        }
        else if (this.value) {
            console.warn('asset-select: setting a value to a asset-select with given formControl ' +
                'is currently not supported. Ask your favorite frontend dev to fix it.');
            // TODO
        }
        this.useConfig(this.config);
    }
    ngOnInit() {
        this.config = Object.assign({}, this.fileService.assetListConfig);
        Object.assign(this.config, { solo: this.solo });
        // resolve possible string ids
        const ids = this.value ? this.value
            .map((asset) => typeof asset === 'string' ? asset : '')
            .filter((asset) => asset.length) : [];
        if (!ids.length) {
            return this.initValue();
        }
        return this.fileService.resolveAssets(ids)
            .then((assets) => {
            this.initValue(assets);
        });
    }
    select(item) {
        this.selection.toggle(item);
        if (this.config.solo) {
            this.pop.toggle(false);
            this.active = false;
        }
    }
    toggle(active = !this.active, emit = false) {
        super.toggle(active, emit);
        this.pop.toggle();
    }
    canToggle() {
        return true;
    }
    selectUpload(upload) {
        if (this.solo) {
            this.selection.select(upload.item);
        }
        else {
            this.selection.toggleAll(upload.items);
        }
    }
    editItem(item) {
        if (!item.getBody().isResolved) {
            item.getBody().resolve().then((asset) => {
                console.log('resolved', asset);
            });
        }
        else {
            console.log('edit', item.getBody());
        }
        // TODO open edit pop
    }
}
AssetSelectComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-asset-select',
                templateUrl: './asset-select.component.html',
                styleUrls: ['../../../../ui/src/form/select/select.component.scss'],
                encapsulation: core_1.ViewEncapsulation.None,
                providers: [
                    {
                        provide: forms_1.NG_VALUE_ACCESSOR,
                        useExisting: core_1.forwardRef(() => AssetSelectComponent),
                        multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
AssetSelectComponent.ctorParameters = () => [
    { type: file_service_1.FileService, },
];
AssetSelectComponent.propDecorators = {
    'formControl': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
    'field': [{ type: core_1.Input },],
    'item': [{ type: core_1.Input },],
    'model': [{ type: core_1.Input },],
    'pop': [{ type: core_1.ViewChild, args: ['assetPop',] },],
};
exports.AssetSelectComponent = AssetSelectComponent;
//# sourceMappingURL=asset-select.component.js.map