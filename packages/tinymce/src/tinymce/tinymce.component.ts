import {
  ApplicationRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import * as tinymce from 'tinymce';
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
import { editorSettings } from './tinymce-settings';

@Component({
  selector: 'ec-tinymce',
  templateUrl: './tinymce.component.html',
  styleUrls: ['./tinymce.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  update: Subject<any> = new Subject();
  @Input() debounce = 200;
  @Output() change: EventEmitter<string> = new EventEmitter();
  public value = '';

  constructor(private app: ApplicationRef) {
    this.update.asObservable()
    .debounceTime(this.debounce)
    .subscribe((value) => {
      this.value = value;
      this.propagateChange(value);
      this.change.emit(value);
      this.app.tick();
    })
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
      this.editor.on('change', () => this.update.next(this.editor.getContent()));
      return this.editor;
    });
  }

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
