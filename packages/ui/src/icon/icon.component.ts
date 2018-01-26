import { Component, OnInit, Input } from '@angular/core';
import { IconService } from './icon.service';
import { Icon } from './icon.interface';

@Component({
    selector: 'ec-icon',
    templateUrl: './icon.component.html'
})

export class IconComponent implements OnInit {
    icon: Icon;
    @Input() name: string;

    constructor(private iconService: IconService) {
    }

    ngOnInit() {
        this.icon = this.iconService.get(this.name);
        if (!this.icon) {
            console.warn(`Icon ${this.name} cannot be found. Using the following icons:`, this.iconService.icons);
        }
    }
}
