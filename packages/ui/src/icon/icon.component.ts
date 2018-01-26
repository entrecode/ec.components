import { Component, OnInit, Input } from '@angular/core';
import { IconService } from './icon.service';
import { Icon } from './icon.interface';
/** Displays icons by name. If the matching Icon (from registry contains a content, the content is shown. If not, is is expected to be a ec-icon. */
@Component({
    selector: 'ec-icon',
    templateUrl: './icon.component.html'
})

export class IconComponent implements OnInit {
    /** The name of the icon. An Icon with this name is expected to be present in the current iconService registry. */
    @Input() name: string;
    /** The resolved icon (by name) */
    icon: Icon;
    constructor(private iconService: IconService) {
    }
    /** The component will resolve the icon from the current iconService registry. A warning is logged if no icon can be found. */
    ngOnInit() {
        this.icon = this.iconService.get(this.name);
        if (!this.icon) {
            console.warn(`Icon ${this.name} cannot be found. Using the following icon registry:`, this.iconService.registry);
        }
    }
}
