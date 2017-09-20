import { Component, ElementRef, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import * as tinymce from 'tinymce';
import { SdkService } from '../../../data/src/sdk/sdk.service';
import 'tinymce/themes/modern';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/template';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/code';
import 'tinymce/plugins/link';
import 'tinymce/plugins/table';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/colorpicker';
// import 'tinymce/skins/lightgray/skin.min.css'; // todo
// import 'tinymce/skins/lightgray/content.min.css';
import { editorSettings } from './tinymce-settings';

@Component({
  selector: 'ec-tinymce',
  templateUrl: './tinymce.component.html',
  styleUrls: ['./tinymce.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TinymceComponent),
      multi: true
    }
  ]
})
export class TinymceComponent implements OnInit, OnDestroy, ControlValueAccessor {
  ready: Promise<any>;
  private editor: any;
  @ViewChild('container') container: ElementRef;
  public value = '';

  constructor(private elementRef: ElementRef, private sdk: SdkService) {
  }

  ngOnInit() {
    this.ready = tinymce.init(
      Object.assign(editorSettings, {
        target: this.container.nativeElement
      })).then((editor) => {
      this.editor = editor[0];
      this.editor.setContent(this.value || '');
      this.editor.on('dblclick', (e) => {
        if (e.target.localName === 'img') {
          this.editor.buttons.image.onclick(true, e.toElement);
        }
      });
      return this.editor;
    });
  }

  // editor.getContent() // todo on change

  ngOnDestroy() {
    if (this.editor) {
      this.ready.then((editor) => {
        editor.destroy();
      });
    }
  }

  writeValue(value: any) {
    this.value = value || '';
    this.ready.then((editor) => {
      console.log('write', this.value, editor);
      editor.setContent(this.value);
    });
  }

  propagateChange = (_: any) => {
  };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }
}
