import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ec-doclinks',
    templateUrl: 'doclinks.component.html'
})

export class DoclinksComponent {
    baseHref = 'https://entrecode.github.io/ec.components/';
    @Input() links = [];
    getUrl(link) {
        return this.baseHref + link;
    }
}
