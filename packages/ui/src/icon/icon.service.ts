import { Injectable } from '@angular/core';
import { ecIcons } from './ec-icons';
import { Icon } from './icon.interface';

@Injectable()
export class IconService {
    public icons: Icon[] = ecIcons;
    constructor() { }

    use(icons: Icon[] = ecIcons) {
        this.icons = icons;
    }

    get(name: string) {
        return this.icons.find(icon => icon.name === name);
    }

    set(icons: Icon[] = []) {
        icons.map(icon => {
            const index = this.icons.indexOf(this.get(icon.name));
            if (index === -1) {
                this.icons.push(icon);
            } else {
                this.icons[index] = icon;
            }
        })
    }
}
