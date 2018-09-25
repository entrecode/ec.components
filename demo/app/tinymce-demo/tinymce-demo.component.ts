import { Component, OnInit, ViewChild, ApplicationRef, NgZone } from '@angular/core';
import { AssetListPopComponent } from '@ec.components/data/src/files/asset-list-pop/asset-list-pop.component';
import { TinymceComponent } from '@ec.components/tinymce/src/tinymce/tinymce.component';
import { PopComponent, FormComponent, LoaderComponent } from '@ec.components/ui';
import { DefaultEntryInputComponent } from '@ec.components/data/src/entry-form/default-entry-input.component';
import { SdkService } from '@ec.components/data';

@Component({
  selector: 'ec-tinymce-demo',
  templateUrl: './tinymce-demo.component.html'
})
export class TinymceDemoComponent {
  html = '<h1>Demo</h1>';
  editor: any;
  /** asset pop that will be opened when the image button is pressed */
  @ViewChild('imagePop') imagePop: PopComponent;
  @ViewChild('imageLoader') imageLoader: LoaderComponent;
  @ViewChild('tinyWithAssets') tinymce: TinymceComponent;

  constructor(public sdk: SdkService, public zone: NgZone) {
  }

  initEditor(editor) {
    this.editor = editor;
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

  addImage({ url, alt, size }) {
    this.tinymce.addImageByUrl(url, alt, size);
  }
}
