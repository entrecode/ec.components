import { Component, OnInit, ViewChild, ApplicationRef, NgZone } from '@angular/core';
import { AssetListPopComponent } from '@ec.components/data/src/files/asset-list-pop/asset-list-pop.component';
import { TinymceComponent } from '@ec.components/tinymce/src/tinymce/tinymce.component';
import { PopComponent } from '@ec.components/ui';

@Component({
  selector: 'ec-tinymce-demo',
  templateUrl: './tinymce-demo.component.html'
})
export class TinymceDemoComponent {

  html = '<h1>Demo</h1>';
  editor: any;
  /** asset pop that will be opened when the image button is pressed */
  @ViewChild(AssetListPopComponent) assetListPop: AssetListPopComponent;

  @ViewChild(PopComponent) imagePop: PopComponent;

  imageForm = {
    fields: {
      alt: {
        label: 'Alt Text',
        view: 'string'
      },
      autoWidth: {
        label: 'Automatische Breite',
        view: 'boolean'
      },
      width: {
        label: 'Breite',
        view: 'number',
      },
      height: {
        label: 'Höhe',
        view: 'number'
      }
    }
  }

  constructor(public zone: NgZone) {
  }

  initEditor(editor) {
    this.editor = editor;
    editor.addButton('image', {
      icon: 'image',
      onclick: (edit, element) => {
        this.zone.run(() => {
          const id = Date.now();
          // this.imagePop.show();
          this.assetListPop.show();
        });
      }
    });
  }

  addAsset(assetItem, tiny: TinymceComponent) {
    const image = assetItem.getBody();
    const size = 200;
    this.assetListPop.hide();
    const load = Promise.resolve(image.getImageUrl(size))
      .then(url => tiny.addImageByUrl(url, image.title, size));
  }
}
