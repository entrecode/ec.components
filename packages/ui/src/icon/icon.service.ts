import { Injectable } from '@angular/core';
import { ecIcons } from './ec-icons';
import { Icon } from './icon.interface';
/** Service to register icons and icon sets. The default set is ec-icons. (Requires including ec-icons) */
@Injectable()
export class IconService {
    /** The current icon set that is registered to the service. It will be used to resolve icons from. */
    public registry: Icon[] = ecIcons;
    constructor() { }

    /** Uses the given icon set. Replaces registry. */
    use(icons: Icon[] = ecIcons) {
        this.registry = icons;
    }
    /** resolves an icon from the registry by name */
    get(name: string) {
        return this.registry.find(icon => icon.name === name);
    }
    /** Uses the given icon set to enhance the current registry. All duplicates will be overriden. Non specified icons will stay in the registry. */
    set(icons: Icon[] = []) {
        icons.map(icon => {
            const index = this.registry.indexOf(this.get(icon.name));
            if (index === -1) {
                this.registry.push(icon);
            } else {
                this.registry[index] = icon;
            }
        })
    }
}
