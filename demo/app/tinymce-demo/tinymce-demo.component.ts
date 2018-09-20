import { Component, OnInit, ViewChild, ApplicationRef, NgZone } from '@angular/core';
import { AssetListPopComponent } from '@ec.components/data/src/files/asset-list-pop/asset-list-pop.component';
import { TinymceComponent } from '@ec.components/tinymce/src/tinymce/tinymce.component';
import { Editor } from 'tinymce';
import { LoaderService } from '@ec.components/ui';

@Component({
  selector: 'ec-tinymce-demo',
  templateUrl: './tinymce-demo.component.html'
})
export class TinymceDemoComponent {

  html = '<h1>Demo</h1>';
  editor: any;
  /** asset pop that will be opened when the image button is pressed */
  @ViewChild(AssetListPopComponent) assetListPop: AssetListPopComponent;

  constructor(public zone: NgZone) {
  }

  initEditor(editor) {
    this.editor = editor;
    editor.addButton('image', {
      icon: 'image',
      onclick: (edit, element) => {
        this.zone.run(() => {
          const id = Date.now();
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
