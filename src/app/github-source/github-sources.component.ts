import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PopComponent } from '@ec.components/ui';

@Component({
    selector: 'ec-github-sources',
    templateUrl: './github-sources.component.html',
    styleUrls: ['./github-sources.component.scss']
})

export class GithubSourcesComponent implements OnInit {
    @Input() paths = [];
    modes = {
        html: 'html',
        js: 'javascript',
        ts: 'typescript'
    };
    path: string;
    @ViewChild(PopComponent) sourcePop: PopComponent;
    constructor() { }

    ngOnInit() { }

    getFileName(path) {
        if (!path) {
            return '';
        }
        const p = path.split('/');
        return p[p.length - 1];
    }

    getFileMode(path) {
        const p = path.split('.');
        const ext = p[p.length - 1];
        return this.modes[ext] || ext;
    }

    showSource(path) {
        this.path = path;
        this.sourcePop.show();
    }
}
