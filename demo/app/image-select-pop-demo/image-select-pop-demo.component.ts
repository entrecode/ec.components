import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ec-image-select-pop-demo',
    template: `
    <h2>image-select-pop</h2>
    <p>This component can be used to pick an image and set width/height + alt text.
    It can be used e.g. in a wysiwyg editor like tinymce (see tinymce demo)</p>
    <a class="btn" (click)="imagePop.show()">open</a>
    <ec-image-select-pop #imagePop assetGroupID="test" (changed)="pickedImage($event)"></ec-image-select-pop>
    <div>
        <img *ngIf="url" [src]="url" [alt]="alt" [width]="size"/>
    </div>
    `
})

export class ImageSelectPopDemoComponent {
    url: any;
    alt: any;
    size: any;
    constructor() { }

    pickedImage({ url, alt, size }) {
        console.log('picked image', url, alt, size);
        this.url = url;
        this.alt = alt;
        this.size = size;
    }

}
