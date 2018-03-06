import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultInputComponent, InputComponent } from '@ec.components/ui';
// import 'ace-builds/src-noconflict/ace.js';

/** Workaround that expects ace to be imported somewhere else... */
declare const ace: any;
/** Wraps ace editor as angular component. Implements ControlValueAccessor!
 *
 * <example-url>https://components.entrecode.de/misc/ace</example-url>
*/
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
export class AceComponent extends DefaultInputComponent implements ControlValueAccessor, OnInit, OnChanges {
    /** The ace editor instance */
    editor: any;
    /**
     * The current value of the editor
     */
    value = '';
    /**
     * Promise that resolves when the editor has been initialized.
     */
    ready: Promise<any>;
    /** Form input component */
    input: InputComponent;
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

    /** creates new ace instance if not present and sets mode and theme if given */
    init() {
        if (!this.editor) {
            this.editor = ace.edit(this.container.nativeElement);
        }
        this.ready = Promise.resolve(this.editor);
        if (this.mode) {
            this.setMode(this.mode);
        }
        if (this.theme) {
            this.setTheme(this.theme);
        }
        if (this.value) {
            this.editor.setValue(this.value, 1);
        }
        this.ready.then((editor) => {
            editor.on('change', (e) => {
                this.propagateChange(this.editor.getValue());
                // TODO: find a way to omit this line in custom components and hook to change from input.component or form.component
                if (this.input) {
                    this.input.propagateChange(this.editor.getValue());
                }
            });
        });
    }
    /** Sets the editor mode to the specified language (after ace/mode/) */
    setMode(mode: string) {
        this.mode = mode;
        if (!this.editor) {
            return;
        }
        this.editor.session.setMode('ace/mode/' + this.mode);
    }

    /** Sets the editor theme to the specified theme (after ace/theme/) */
    setTheme(theme: string) {
        this.theme = theme;
        if (!this.editor) {
            return;
        }
        this.editor.setTheme('ace/theme/' + this.theme);
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
        if (!this.ready) {
            return;
        }
        this.ready.then((editor) => {
            editor.setValue(this.value, 1);
        });
    }

    propagateChange = (_: any) => {
    };

    /** Registers change callback */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {
    }
}
