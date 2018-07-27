import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ec-github-sources',
    templateUrl: './github-sources.component.html'
})

export class GithubSourcesComponent implements OnInit {
    @Input() paths = [];
    modes = {
        html: 'html',
        js: 'javascript',
        ts: 'typescript'
    }

    constructor() { }

    ngOnInit() { }

    getFileName(path) {
        const p = path.split('/');
        return p[p.length - 1];
    }

    getFileMode(path) {
        const p = path.split('.');
        const ext = p[p.length - 1];
        return this.modes[ext] || ext;
    }
}
