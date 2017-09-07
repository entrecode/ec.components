"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by felix on 26.05.17.
 */
const core_1 = require("@angular/core");
const router_1 = require("@angular/router"); //TODO find way to import Route without getting warning
/** Renders a nested menu from a given routes Array (the same you would use for angular routing). */
class MenuComponent {
    /** Injects the Router. */
    constructor(router) {
        this.router = router;
        /** Color map of submenus. */
        this.colors = ['#29A9E1', '#00DBF0', '#4A5EA9', '#29A9E1', '#C9C8D4'];
        /** Delay before menu is hidden after mouseout. */
        this.vanishDelay = 500;
        /** Delay before menu is shown on mouseover. */
        this.hoverDelay = 50;
    }
    /** updates the routes on change of route */
    ngOnChanges() {
        if (this.route) {
            this.routes = this.route.children.filter(route => route.path && route.path.indexOf(':') == -1);
        }
    }
    /** Returns true if the item or a child of it is active. */
    hasActivePath(item, parent = this) {
        return parent.getPath(item) === this.router.url;
    }
    /** Returns true if the item is selected. */
    isSelected(item) {
        const path = this.getPath(item);
        return path !== '/' && (path === this.router.url || this.router.url.indexOf(path) === 0);
    }
    /** Returns true if the item is active. */
    isActive(item) {
        return this.hover === item || (!this.hover && this.isSelected(item));
    }
    /** Returns the level of nesting (parent=0). */
    getLevel(level = 0) {
        return this.parent ? this.parent.getLevel(++level) : level;
    }
    /** Returns the color for the current level. */
    getColor(level = 0) {
        return this.colors[this.getLevel(level) % this.colors.length];
    }
    /** Returns the color for the given item. */
    getItemColor(item) {
        return this.isActive(item) ? this.getColor(1) : 'initial';
    }
    /** Hovers the item after hoverDelay timeout. */
    hoverItem(item) {
        if (!this.hover) {
            this.hover = item;
        }
        this.timeout = setTimeout(() => {
            this.hover = item;
        }, this.hoverDelay);
    }
    /** Cancels the current timeout */
    cancelTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }
    /** Hovers out after vanishDelay */
    hoverOut() {
        this.timeout = setTimeout(() => {
            delete this.hover;
        }, this.vanishDelay);
    }
    /** Returns the full path to an item. */
    getPath(item, path = '') {
        path = '/' + item.path + path;
        if (!this.parent) {
            return path;
        }
        return this.parent.getPath(this.route, path);
    }
}
MenuComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-menu,[ec-menu]',
                templateUrl: './menu.component.html',
                styleUrls: ['./menu.component.scss']
            },] },
];
/** @nocollapse */
MenuComponent.ctorParameters = () => [
    { type: router_1.Router, },
];
MenuComponent.propDecorators = {
    'routes': [{ type: core_1.Input },],
    'route': [{ type: core_1.Input },],
    'title': [{ type: core_1.Input },],
    'parent': [{ type: core_1.Input },],
    'colors': [{ type: core_1.Input },],
    'vanishDelay': [{ type: core_1.Input },],
    'hoverDelay': [{ type: core_1.Input },],
};
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map