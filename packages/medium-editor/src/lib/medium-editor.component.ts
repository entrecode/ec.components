import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import * as MediumEditor from 'medium-editor/dist/js/medium-editor';

/** Wraps medium-editor to a reactive form component.
 * <example-url>https://components.entrecode.de/misc/medium-editor?e=1</example-url>
 */
@Component({
  selector: 'ec-medium-editor',
  styleUrls: ['./medium-editor.component.scss'],
  templateUrl: 'medium-editor.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MediumEditorComponent),
      multi: true,
    },
  ],
})
export class MediumEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  /** data model */
  @Input() model: any;
  /** MediumEditor [options](https://github.com/yabwe/medium-editor#mediumeditor-options) */
  @Input() options: any = {};
  /** empty placeholder */
  @Input() placeholder: string;
  /** change emitter */
  @Output() modelChange: EventEmitter<any> = new EventEmitter();
  /** container element */
  @ViewChild('container') container: ElementRef;
  /** current value */
  value: any;
  /** editor instance */
  private editor: MediumEditor;
  /** ready promise */
  public ready: Promise<MediumEditor>;

  /** inits editor */
  ngOnInit() {
    this.container.nativeElement.innerHTML = this.model || '';
    this.options.placeholder = this.placeholder;
    this.editor = new MediumEditor(this.container.nativeElement, this.options);
    this.editor.subscribe('editableInput', () => {
      this.value = this.editor.getContent();
      this.propagateChange(this.value);
    });
    this.ready = Promise.resolve(this.editor);
  }
  /** destroys editor */
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  /** Writes value to editor on outside model change. */
  writeValue(value: any) {
    this.value = value || '';
    this.ready.then((editor) => {
      editor.setContent(this.value);
    });
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
