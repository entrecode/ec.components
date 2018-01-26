import { Component, OnInit, PipeTransform, Pipe, Injectable } from '@angular/core';
import { IconService } from '@ec.components/ui/src/icon/icon.service';
import { ecIcons } from '@ec.components/ui/src/icon/ec-icons';
import { emojiIcons } from '@ec.components/ui/src/icon/emoji-icons';


@Component({
    selector: 'ec-icon-demo',
    templateUrl: 'icon-demo.component.html',
})

export class IconDemoComponent implements OnInit {
    icons: string[];
    sets = [{ label: 'Emoji Icons', set: emojiIcons }, { label: 'ec-icons', set: ecIcons }];
    query = '';
    constructor(public iconService: IconService) {
        this.iconService.use(emojiIcons);
    }

    ngOnInit() { }
}
