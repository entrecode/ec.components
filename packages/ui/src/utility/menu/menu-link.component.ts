import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ec-menu-link',
    template: `
    <ul class="nav__items">
    <a [routerLink]="getPath(item)">{{item.data?.title || item.path}}</a>
    <ec-menu-link *ngFor="let child of item.children" [parent]="this" [item]="child"></ec-menu-link>
  </ul>
    `
})

export class MenuLinkComponent implements OnInit {
    @Input() routes; // : Route[];
    /** The currently active item */
    @Input() item; // : Route;
    /** The title of the menu */
    @Input() title: string;
    /** Parent Menu (when nested) */
    @Input() parent: MenuLinkComponent;

    constructor() { }

    ngOnInit() {
        console.log('menulink', this);
    }

    /** Returns the full path to an item. */
    getPath(item, path: string = '') {
        path = '/' + item.path + path;
        if (!this.parent) {
            return path;
        }
        return this.parent.getPath(this.item, path);
    }
}
