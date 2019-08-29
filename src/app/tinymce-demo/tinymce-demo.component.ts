import { Component, ViewChild, NgZone } from '@angular/core';
/* import { TinymceComponent } from '@ec.components/tinymce'; */
import { LoaderComponent } from '@ec.components/ui';
import { SdkService } from '@ec.components/data';
import { ImageSelectPopComponent } from '@ec.components/data';
import { TinyInputComponent } from './tiny-input.component';

@Component({
  selector: 'ec-tinymce-demo',
  templateUrl: './tinymce-demo.component.html',
})
export class TinymceDemoComponent {
  html = '<h1>Demo</h1>';
  editor: any;
  /** asset pop that will be opened when the image button is pressed */
  @ViewChild('imageLoader', { static: false }) imageLoader: LoaderComponent;
  tinyFormConfig = {
    fields: {
      tiny: {
        label: 'This TinyMCE is hosted inside an ec-form',
        input: TinyInputComponent,
        prefill: '<p>Hallo</p>',
        relation: 'test',
      },
    },
  };

  constructor(public sdk: SdkService, public zone: NgZone) {}

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
      },
    });
  }

  addImage({ url, alt, size }, tiny /*: TinymceComponent */) {
    console.log('add image', tiny);
    tiny.addImageByUrl(url, alt, size);
  }
}
