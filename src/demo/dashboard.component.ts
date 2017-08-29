import { Component } from '@angular/core';
import { demoRoutes } from './demo.routes';

@Component({
  selector: 'demo-dashboard',
  template: `<h2>ec.components demos</h2>
<p>Welcome to the ec.components demos! 
You can select a demo from the menu above or load a <a [href]="randomDemo">random demo</a>!</p>
<p>Other Resources: </p>
<ul>
<li><a href="https://github.com/entrecode/ec.components/tree/master/src/demo">demo sources</a></li>
<li><a href="https://github.com/entrecode/ec.components">Github</a></li>
<li><a href="https://entrecode.github.io/ec.components">Documentation</a></li>
</ul>
`
})
export class DemoDashboardComponent {
  private demos = demoRoutes.slice(1);
  public randomDemo: any;

  randomRoute(routes, path = '') {
    const random = routes[Math.floor(Math.random() * routes.length)];
    if (!random.children) {
      return path + '/' + random.path;
    }
    return this.randomRoute(random.children, path + '/' + random.path);
  }

  constructor() {
    console.log('demos', this.demos);
    this.randomDemo = this.randomRoute(this.demos);
    // this.randomDemo
  }
}
