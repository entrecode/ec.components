/**
 * Created by felix on 26.05.17.
 */
import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'ec-menu,[ec-menu]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() routes: Route[];
  @Input() route: Route;
  @Input() title: string;
  @Input() parent: MenuComponent;
  @Input() colors: string[] = ['#29A9E1', '#00DBF0', '#4A5EA9', '#29A9E1', '#C9C8D4'];
  @Input() vanishDelay: number = 500;
  @Input() hoverDelay: number = 50;

  private hover: Route;
  private timeout;

  constructor(private router: Router) {
  }

  ngOnChanges() {
    if (this.route) {
      this.routes = this.route.children;
    }
  }

  hasActivePath(item, parent = this) { //=this.parent
    return parent.getPath(item) === this.router.url;
  }

  isSelected(item) {
    return this.getPath(item) === this.router.url || this.router.url.indexOf(this.getPath(item)) === 0;
  }

  isActive(item) {
    return this.hover === item || (!this.hover && this.isSelected(item));
  }

  getLevel(level = 0) {
    return this.parent ? this.parent.getLevel(++level) : level;
  }

  getColor(level = 0) {
    return this.colors[this.getLevel(level) % this.colors.length];
  }

  getItemColor(item) {
    return this.isActive(item) ? this.getColor(1) : 'initial';
  }

  hoverItem(item: Route) {
    if (!this.hover) {
      this.hover = item;
    }
    this.timeout = setTimeout(() => {
      this.hover = item;
    }, this.hoverDelay);
  }

  cancelTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  hoverOut() {
    this.timeout = setTimeout(() => {
      delete this.hover;
    }, this.vanishDelay)
  }

  getPath(item, path: string = '') {
    path = '/' + item.path + path;
    if (!this.parent) {
      return path;
    }
    return this.parent.getPath(this.route, path);
  }
}