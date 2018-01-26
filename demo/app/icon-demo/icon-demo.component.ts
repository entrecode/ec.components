import { Component, OnInit, PipeTransform, Pipe, Injectable } from '@angular/core';
import { types } from './types';


@Component({
    selector: 'ec-icon-demo',
    templateUrl: 'icon-demo.component.html',
})

export class IconDemoComponent implements OnInit {
    allIcons = types;
    query = '';
    constructor() {
    }

    ngOnInit() { }
}
