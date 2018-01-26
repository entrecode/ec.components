import { Component, OnInit, PipeTransform, Pipe, Injectable } from '@angular/core';
import { IconService } from '@ec.components/ui/src/icon/icon.service';
import { ecIcons } from '@ec.components/ui/src/icon/ec-icons';


@Component({
    selector: 'ec-icon-demo',
    templateUrl: 'icon-demo.component.html',
})

export class IconDemoComponent implements OnInit {
    icons: string[];
    query = '';
    constructor(public iconService: IconService) {
        this.iconService.use([{
            name: 'add',
            content: '+'
        }, {
            name: 'close',
            content: 'x'
        }]);
        this.icons = this.iconService.icons.map(icon => icon.name);
        console.log('icons', this.icons);
    }

    ngOnInit() { }
}
