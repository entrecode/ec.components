import { Component, OnInit, PipeTransform, Pipe, Injectable } from '@angular/core';
import { IconService } from '@ec.components/ui/src/icon/icon.service';
import { ecIcons } from '@ec.components/ui/src/icon/ec-icons';


@Component({
    selector: 'ec-icon-demo',
    templateUrl: 'icon-demo.component.html',
})

export class IconDemoComponent implements OnInit {
    allIcons = ecIcons.map(icon => icon.type);
    query = '';
    constructor(public iconService: IconService) {
    }

    ngOnInit() { }
}
