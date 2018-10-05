import { Component, OnInit, ViewChild, ApplicationRef, NgZone } from '@angular/core';
import { AssetListPopComponent } from '@ec.components/data/src/files/asset-list-pop/asset-list-pop.component';
import { TinymceComponent } from '@ec.components/tinymce/src/tinymce/tinymce.component';
import { PopComponent, FormComponent, LoaderComponent } from '@ec.components/ui';
import { DefaultEntryInputComponent } from '@ec.components/data/src/entry-form/default-entry-input.component';
import { SdkService } from '@ec.components/data';
import { ImageSelectPopComponent } from '@ec.components/data/src/files/image-select-pop/image-select-pop.component';

@Component({
  selector: 'ec-tinymce-demo',
  templateUrl: './tinymce-demo.component.html'
})
export class TinymceDemoComponent {
  html = '<h1>Demo</h1>';
  editor: any;
  /** asset pop that will be opened when the image button is pressed */
  @ViewChild('imageLoader') imageLoader: LoaderComponent;

  constructor(public sdk: SdkService, public zone: NgZone) {
  }

  initEditor(editor, pop: ImageSelectPopComponent) {
    console.log('inited', editor);
    this.editor = editor;
    editor.addButton('image', {
      icon: 'image',
      onclick: (edit, element) => {
        this.zone.run(() => {
          const id = Date.now();
          pop.show();
        });
      }
    });
  }

  addImage({ url, alt, size }, tiny: TinymceComponent) {
    console.log('add image', tiny);
    tiny.addImageByUrl(url, alt, size);
  }
}
