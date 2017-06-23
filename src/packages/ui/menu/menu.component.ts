/**
 * Created by felix on 26.05.17.
 */
import { Component, Input } from '@angular/core';
import { Route, Routes } from '@angular/router';

@Component({
  selector: 'ec-menu,[ec-menu]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() routes: Routes;
  @Input() route: Route;
  @Input() title: string;
  @Input() parent: MenuComponent;

  private hover: Route;
  private timeout;

  ngOnChanges() {
    if (this.route) {
      this.routes = this.route.children;
    }
  }

  hoverItem(item: Route) {
    this.hover = item;
    if (this.timeout) {
      clearTimeout(this.timeout);
      //TODO do recursive bubble magic
    }
  }

  hoverParentItem(item: Route) {
    if (!this.parent) {
      return;
    }
    // this.parent.hoverItem(item);
  }

  hoverOut() {
    this.timeout = setTimeout(() => {
      // delete this.hover; //TODO
    }, 1000)
  }

  getPath(item, path: string = '') {
    path = item.path + '/' + path;
    if (!this.parent) {
      return path;
    }
    return this.parent.getPath(this.route, path);
  }
}