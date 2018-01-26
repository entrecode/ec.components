import { Injectable } from '@angular/core';
import { ecIcons } from './ec-icons';
import { Icon } from './icon.interface';

@Injectable()
export class IconService {
    public icons: Icon[] = ecIcons;
    constructor() { }

    use(icons: Icon[]) {
        this.icons = icons;
    }
}
