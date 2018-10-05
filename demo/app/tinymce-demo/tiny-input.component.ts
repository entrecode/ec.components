import { Component, OnInit, NgZone, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { InputComponent } from '@ec.components/ui';
import { ImageSelectPopComponent } from '@ec.components/data/src/files/image-select-pop/image-select-pop.component';
import { TinymceComponent } from '@ec.components/tinymce/src/tinymce/tinymce.component';

@Component({
    selector: 'ec-tiny-input',
    template: `
    <ec-input-errors [control]="group.get(field.property)"></ec-input-errors>
    <ec-tinymce #tiny [formControl]="group.get(field.property)" (setup)="initEditor($event)"></ec-tinymce>
    <ec-image-select-pop #imagePop [assetGroupID]="field.relation" (changed)="addImage($event, tiny)"></ec-image-select-pop>
    `
})

export class TinyInputComponent extends InputComponent {
    @ViewChild('imagePop') imagePop: ImageSelectPopComponent;

    constructor(public zone: NgZone, componentFactoryResolver: ComponentFactoryResolver) {
        super(componentFactoryResolver);
    }

    initEditor(editor) {
        console.log('setup..', editor);
        // this.editor = editor;
        editor.addButton('image', {
            icon: 'image',
            onclick: (edit, element) => {
                this.zone.run(() => {
                    const id = Date.now();
                    this.imagePop.show();
                });
            }
        });
    }

    addImage({ url, alt, size }, tiny: TinymceComponent) {
        tiny.addImageByUrl(url, alt, size);
    }

}
