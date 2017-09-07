import { Router } from '@angular/router';
/** Renders a nested menu from a given routes Array (the same you would use for angular routing). */
export declare class MenuComponent {
    private router;
    /** Routes that should be used for the menu. You can use your angular router routes here. */
    routes: any;
    /** The currently active route */
    route: any;
    /** The title of the menu */
    title: string;
    /** Parent Menu (when nested) */
    parent: MenuComponent;
    /** Color map of submenus. */
    colors: string[];
    /** Delay before menu is hidden after mouseout. */
    vanishDelay: number;
    /** Delay before menu is shown on mouseover. */
    hoverDelay: number;
    /** The currently hovered Route*/
    hover: any;
    /** The timeout for delay handling */
    private timeout;
    /** Injects the Router. */
    constructor(router: Router);
    /** updates the routes on change of route */
    ngOnChanges(): void;
    /** Returns true if the item or a child of it is active. */
    hasActivePath(item: any, parent?: this): boolean;
    /** Returns true if the item is selected. */
    isSelected(item: any): boolean;
    /** Returns true if the item is active. */
    isActive(item: any): boolean;
    /** Returns the level of nesting (parent=0). */
    getLevel(level?: number): any;
    /** Returns the color for the current level. */
    getColor(level?: number): string;
    /** Returns the color for the given item. */
    getItemColor(item: any): string;
    /** Hovers the item after hoverDelay timeout. */
    hoverItem(item: any): void;
    /** Cancels the current timeout */
    cancelTimeout(): void;
    /** Hovers out after vanishDelay */
    hoverOut(): void;
    /** Returns the full path to an item. */
    getPath(item: any, path?: string): any;
}
