import {
  ApplicationRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  AfterViewInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
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

/** Wraps tinymce as a control input. */
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
export class TinymceComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor {
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
  /** Output that emits when the value has been changed by the user */
  @Output() change: EventEmitter<string> = new EventEmitter();
  /** Current value */
  public value = '';

  /** Subscribes for changes and propagates them + calling application tick manually :( */
  constructor(private app: ApplicationRef) {
    this.update
      .asObservable()
      .debounceTime(this.debounce)
      .subscribe(editor => {
        this.value = editor.getContent();
        this.propagateChange(this.value);
        this.change.emit(this.value);
        this.app.tick();
      });
  }

  /** Initializes the editor */
  ngAfterViewInit() {
    this.ready = Promise.resolve(
      tinymce.init(
        Object.assign(
          editorSettings,
          {
            target: this.container.nativeElement
          },
          this.settings
        )
      )
    ).then(editor => {
      this.editor = editor[0];
      this.editor.setContent(this.value || '');
      this.editor.on('dblclick', e => {
        if (e.target.localName === 'img') {
          this.editor.buttons.image.onclick(true, e.toElement);
        }
      });
      this.editor.on('change keyup', res => this.update.next(this.editor));
      return this.editor;
    });
  }

  /** Destroys the editor. */
  ngOnDestroy() {
    if (this.editor) {
      this.ready.then(editor => {
        editor.destroy();
      });
    }
  }

  /** Writes value to editor on outside model change. */
  writeValue(value: any) {
    this.value = value || '';
    if (!this.ready) {
      return;
    }
    this.ready.then(editor => {
      editor.setContent(this.value);
    });
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
