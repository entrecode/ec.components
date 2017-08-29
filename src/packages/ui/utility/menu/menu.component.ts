/**
 * Created by felix on 26.05.17.
 */
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; //TODO find way to import Route without getting warning

/** Renders a nested menu from a given routes Array (the same you would use for angular routing). */
@Component({
  selector: 'ec-menu,[ec-menu]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  /** Routes that should be used for the menu. You can use your angular router routes here. */
  @Input() routes;//: Route[];
  /** The currently active route */
  @Input() route;//: Route;
  /** The title of the menu */
  @Input() title: string;
  /** Parent Menu (when nested) */
  @Input() parent: MenuComponent;
  /** Color map of submenus. */
  @Input() colors: string[] = ['#29A9E1', '#00DBF0', '#4A5EA9', '#29A9E1', '#C9C8D4'];
  /** Delay before menu is hidden after mouseout. */
  @Input() vanishDelay: number = 500;
  /** Delay before menu is shown on mouseover. */
  @Input() hoverDelay: number = 50;
  /** The currently hovered Route*/
  public hover;//: Route;
  /** The timeout for delay handling */
  private timeout;

  /** Injects the Router. */
  constructor(private router: Router) {
  }

  /** updates the routes on change of route */
  ngOnChanges() {
    if (this.route) {
      this.routes = this.route.children;
    }
  }

  /** Returns true if the item or a child of it is active. */
  hasActivePath(item, parent = this) { //=this.parent
    return parent.getPath(item) === this.router.url;
  }

  /** Returns true if the item is selected. */
  isSelected(item) {
    return this.getPath(item) === this.router.url || this.router.url.indexOf(this.getPath(item)) === 0;
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
  hoverItem(item) { //: Route
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
    }, this.vanishDelay)
  }

  /** Returns the full path to an item. */
  getPath(item, path: string = '') {
    path = '/' + item.path + path;
    if (!this.parent) {
      return path;
    }
    return this.parent.getPath(this.route, path);
  }
}