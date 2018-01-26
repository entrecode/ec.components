import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ec-icon',
    templateUrl: './icon.component.html'
})

export class IconComponent implements OnInit {
    @Input() type: string;

    constructor() { }

    ngOnInit() { }
}
