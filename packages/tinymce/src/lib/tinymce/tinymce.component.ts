import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import tinymce from 'tinymce/tinymce';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/code';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/visualblocks';
import 'tinymce/themes/modern';

import { editorSettings } from './tinymce-settings';
import { debounceTime } from 'rxjs/operators';

/** Wraps tinymce as a control input.
 * <example-url>https://components.entrecode.de/misc/tinymce?e=1</example-url>
 */
@Component({
  selector: 'ec-tinymce',
  templateUrl: './tinymce.component.html',
  styleUrls: ['./tinymce.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TinymceComponent),
      multi: true,
    },
  ],
})
export class TinymceComponent implements AfterViewInit, OnDestroy, ControlValueAccessor, OnDestroy {
  /** Promise that resolves when the editor has been initialized */
  ready: Promise<any>;
  /** The current editor instance */
  public editor: any;
  /** The container where the editor is rendered */
  @ViewChild('container') container: ElementRef;
  /** Subject that is nexted on editor change */
  update: Subject<any> = new Subject();
  /** Debounce time for value change processing */
  @Input() debounce = 200;
  /** TinyMCE Settings. Get Object.assigned to the default settings */
  @Input() settings: any = {};
  /** If true, the editor wont init by default. This can be useful when using tinymce inside tabs or pops where tiny breaks */
  @Input() lazy = false;
  /** Output that emits when the value has been changed by the user */
  @Output() changed: EventEmitter<string> = new EventEmitter();
  /** Output that is emitted when the setup is being made.
   * Passes the editor instance. Intended to be used for custom controls  */
  @Output() setup: EventEmitter<any> = new EventEmitter();
  /** Current value */
  public value = '';

  /** Subscribes for changes and propagates them + calling application tick manually :( */
  constructor(private app: ApplicationRef) {
    this.update
      .asObservable()
      .pipe(debounceTime(this.debounce))
      .subscribe((editor) => {
        if (!this.editor) {
          return;
        }
        this.value = editor.getContent();
        this.propagateChange(this.value);
        this.changed.emit(this.value);
        this.app.tick();
      });
  }
  /** calls init */
  ngAfterViewInit() {
    if (!this.lazy) {
      this.init();
    }
  }
  /** Destroys the editor. */
  destroy() {
    if (this.editor) {
      this.editor.remove();
      delete this.editor;
    }
  }
  /** calls destroy */
  ngOnDestroy() {
    this.destroy();
  }

  /** Initializes the editor */
  init() {
    const settings = Object.assign({}, editorSettings, this.settings, {
      target: this.container.nativeElement,
      setup: (editor) => {
        editorSettings.setup(editor);
        if (this.settings && this.settings.setup) {
          this.settings.setup(editor);
        }
        this.setup.emit(editor);
      },
    });
    this.ready = new Promise((resolve, reject) => setTimeout(() => resolve(tinymce.init(settings))));
    this.ready.then((editor) => {
      this.editor = editor[0];
      this.editor.setContent(this.value || '');
      this.editor.on('dblclick', (e) => {
        if (e.target.localName === 'img') {
          this.editor.buttons.image.onclick(true, e.toElement);
        }
      });
      this.editor.on('change keyup', (res) => this.update.next(this.editor));
      return this.editor;
    });
  }

  /** adds an image by url to the editor */
  addImageByUrl(url: string, caption = '', size = 200) {
    this.editor.execCommand('mceInsertContent', false, `<img alt="${caption}" width="${size}" src="${url}"/>`);
  }
  /** Writes value to editor on outside model change. */
  writeValue(value: any) {
    this.value = value || '';
    if (this.editor) {
      this.editor.setContent(this.value);
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
