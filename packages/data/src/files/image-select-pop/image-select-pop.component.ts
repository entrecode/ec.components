import { Component, OnInit, Input, ViewChild, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormComponent } from '@ec.components/ui/src/form/form.component';
import { FormConfig } from '@ec.components/core';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { PopService } from '@ec.components/ui/src/pop/pop.service';
import { SdkService } from '@ec.components/data/src/sdk/sdk.service';
import { LoaderComponent } from '@ec.components/ui';
import { DefaultEntryInputComponent } from '@ec.components/data/src/entry-form/default-entry-input.component';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';

@Component({
    selector: 'ec-image-select-pop',
    templateUrl: './image-select-pop.component.html'
})

export class ImageSelectPopComponent extends PopComponent implements OnInit {
    @Input() assetGroupID;
    @Input() defaultSize = 400;
    @Output() changed: EventEmitter<any> = new EventEmitter();
    imageForm: FormConfig<any>;
    @ViewChild('imageLoader') imageLoader: LoaderComponent;
    /** Set host class to make sure the type is used */
    @HostBinding('class') class = 'dialog-wrapper';

    constructor(public popService: PopService,
        public sdk: SdkService,
        public symbol: SymbolService) {
        super(popService);
    }

    ngOnInit() {
        this.imageForm = {
            submitButtonLabel: this.symbol.resolve('image-select-pop.submitButtonLabel'),
            onSave: (form, value: { img, height, width, alt }) => {
                if (!this.assetGroupID || this.assetGroupID === 'legacyAsset') {
                    this.sdk.api.asset(value.img)
                        .then(asset => {
                            console.warn('legacy asset not supported...', asset);
                        });
                } else {
                    const size = Math.max(value.width, value.height);
                    const loadImage = this.sdk.api.dmAsset(this.assetGroupID, value.img)
                        .then(asset =>
                            asset.getImageUrl(size)
                        ).then(url => {
                            this.hide();
                            this.changed.emit({ url, alt: value.alt, size });
                        });
                    this.imageLoader.wait(loadImage);
                }
            },
            fields: {
                img: {
                    label: ' ',
                    input: DefaultEntryInputComponent,
                    type: this.assetGroupID && this.assetGroupID !== 'legacyAsset' ? 'dmAsset' : 'asset',
                    relation: this.assetGroupID || 'legacyAsset',
                    required: true,
                    changed: (value, form) => {
                        if (!this.assetGroupID || this.assetGroupID === 'legacyAsset') {
                            this.sdk.api.asset(value).then(asset => {
                                console.warn('legacy asset not supported', asset);
                            });
                        } else {
                            const loadImg = this.sdk.api.dmAsset(this.assetGroupID, value).then(asset => {
                                const resolution = asset.file.resolution;
                                const ratio = resolution.width / resolution.height;
                                const width = Math.min(this.defaultSize, resolution.width);
                                form.group.controls.width.setValue(width);
                                form.group.controls.alt.setValue(asset.title);
                                form.group.controls.ratio.setValue(ratio);
                            });
                            this.imageLoader.wait(loadImg);
                        }
                    }
                },
                alt: {
                    label: this.symbol.resolve('image-select-pop.alt'),
                    view: 'string'
                },
                ratio: {
                    hideInForm: true,
                    view: 'number'
                },
                keepRatio: {
                    label: this.symbol.resolve('image-select-pop.keepRatio'),
                    view: 'boolean',
                    prefill: true,
                    changed: (value) => {
                        if (value === true) {
                            console.log('should fix ratio now...');
                        }
                    }
                },
                width: {
                    label: this.symbol.resolve('image-select-pop.width'),
                    view: 'number',
                    columns: 6,
                    changed: (value, form: FormComponent<any>) => {
                        const ratio = form.getValue('ratio');
                        if (ratio && form.getValue('keepRatio')) {
                            form.group.controls.height.setValue(Math.round(value / ratio));
                        }
                    }
                },
                height: {
                    label: this.symbol.resolve('image-select-pop.height'),
                    view: 'number',
                    columns: 6,
                    changed: (value, form) => {
                        const ratio = form.getValue('ratio');
                        if (ratio && form.getValue('keepRatio')) {
                            form.group.controls.width.setValue(Math.round(value * ratio));
                        }
                    }
                }
            }
        }
    }
}
