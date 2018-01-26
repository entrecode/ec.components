import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, forwardRef } from '@angular/core';
// import 'ace-builds/src-noconflict/ace.js';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
/** Workaround that expects ace to be imported somewhere else... */
declare const ace: any;
@Component({
    selector: 'ec-ace',
    templateUrl: 'ace.component.html',
    styleUrls: ['ace.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AceComponent),
            multi: true
        }
    ]
})
/** Wraps ace editor as angular component. Implements ControlValueAccessor! */
export class AceComponent implements OnInit, OnChanges, ControlValueAccessor {
    /** The ace editor instance */
    editor: any;
    /**
     * The current value of the editor
     */
    value: string;
    /**
     * Promise that resolves when the editor has been initialized.
     */
    ready: Promise<any>;
    /**
     * container element for ace editor
     */
    @ViewChild('container') container: ElementRef;
    /**
     * mode that should be used (e.g. javascript). Depending on your way of importing ace you have to make sure, the mode is availabe.
     */
    @Input() mode: string; // https://github.com/ajaxorg/ace-builds/blob/master/src/ext-modelist.js
    /**
     * theme that should be used (e.g. javascript). Depending on your way of importing ace you have to make sure, the theme is availabe.
     */
    @Input() theme: string; // https://github.com/ajaxorg/ace-builds/blob/master/src/ext-themelist.js

    constructor() {
    }
    /** creates new ace instance if not present and sets mode and theme if given */
    init() {
        if (!this.editor) {
            this.editor = ace.edit(this.container.nativeElement);
            this.ready = Promise.resolve(this.editor);
        }
        if (this.mode) {
            this.editor.session.setMode('ace/mode/' + this.mode);
        }
        if (this.theme) {
            this.editor.setTheme('ace/theme/' + this.theme);
        }
    }

    /** Inits the editor */
    ngOnInit() {
        this.init();
    }
    /** Re-inits the editor */
    ngOnChanges() {
        this.init();
    }

    /** writes value to editor on outside model change. */
    writeValue(value: any) {
        this.value = value || '';
        this.ready.then((editor) => {
            editor.setValue(this.value);
        });
    }

    propagateChange = (_: any) => {
    };

    registerOnChange(fn) {
        this.propagateChange = fn;
        this.ready.then((editor) => {
            editor.on('change', (e) => {
                this.propagateChange(this.editor.getValue());
            });
        })
    }

    registerOnTouched() {
    }
}
