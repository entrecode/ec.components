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
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import * as MediumEditor from 'medium-editor/dist/js/medium-editor';

@Component({
  selector: 'ec-medium-editor',
  styleUrls: ['./medium-editor.component.scss'],
  templateUrl: 'medium-editor.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MediumEditorComponent),
      multi: true
    }
  ]
})
export class MediumEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() model: any;
  @Input() options: any;
  @Input() placeholder: string;
  @Output() modelChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('container') container: ElementRef;
  value: any;
  private editor: MediumEditor;
  public ready: Promise<MediumEditor>;

  constructor() {
  }

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

  propagateChange = (_: any) => {
  };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }
}
