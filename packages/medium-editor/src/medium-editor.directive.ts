import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import * as MediumEditor from 'medium-editor/dist/js/medium-editor';

@Directive({
  selector: '[ecMediumEditor]'
})
export class MediumEditorDirective implements OnInit, OnChanges, OnDestroy {
  @Input() model: any;
  @Input() options: any;
  @Input() placeholder: string;
  @Output() modelChange: EventEmitter<any> = new EventEmitter();
  private editor: MediumEditor;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.el.nativeElement.innerHTML = this.model || '';
    this.options.placeholder = this.placeholder;
    this.editor = new MediumEditor(this.el.nativeElement, this.options);
    this.editor.subscribe('editableInput', () => this.modelChange.emit(this.editor.getContent()));

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model && changes.model.currentValue !== this.model) {
      this.editor.setContent(this.model || '');
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
