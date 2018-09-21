import { Component, OnInit } from '@angular/core';
import { AceComponent } from '@ec.components/ace/src/ace.component';
// import 'ace-builds/src-noconflict/ace.js';

@Component({
    template: `
    <h2>Ace</h2>
    <strong>HTML</strong>
    <ec-ace mode="html" [(ngModel)]="html"></ec-ace>
    <strong>CSS</strong>
    <ec-ace mode="css" [(ngModel)]="css"></ec-ace>
    <strong>JS</strong>
    <ec-ace mode="javascript" [(ngModel)]="javascript"></ec-ace>
    <a class="btn" (click)="fixDoubleQuotes()">Fix Double Quotes</a>
    <pre><code>{{javascript}}</code></pre>
    <strong>JSON</strong>
    <ec-ace mode="json" theme="monokai" [(ngModel)]="json"></ec-ace>
    <pre><code>{{json}}</code></pre>
    <ec-form [config]="jsonFormConfig" (submitted)="submitForm($event)"></ec-form>
    `
})

export class AceDemoComponent implements OnInit {
    javascript = 'console.log("double quotes are awful");';
    html = '<h1>Hello There</h1>';
    css = 'h1 { color: red }';
    json;
    jsonFormConfig = {
        fields: {
            json: {
                label: 'JSON',
                input: AceComponent,
                prefill: '{"test":1}',
                init: (component: AceComponent) => {
                    component.setMode('json');
                    component.setTheme('monokai');
                }
            }
        }
    }

    submitForm(e) {
        console.log('submit', e);
    }

    fixDoubleQuotes() {
        this.javascript = 'console.log(\'double quotes are awful\');';
    }

    ngOnInit() { }
}
