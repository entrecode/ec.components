import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* import { demoRoutes } from './demo.routes'; */

@Component({
  template: `
    <h2>ec.components demos</h2>
    <p>Welcome to the ec.components demos! You can select a demo from the menu on the side.</p>
    <p>Other Resources:</p>
    <ul>
      <li><a href="https://entrecode.github.io/ec.components">ec.components docs</a></li>
      <li><a href="https://github.com/entrecode/ec.components">ec.components github</a></li>
      <li><a href="https://entrecode.github.io/ec.sdk/">ec.sdk docs</a></li>
      <li><a href="https://entrecode.github.io/x.ui/">x.ui docs</a></li>
      <li><a href="https://doc.entrecode.de/">entrecode API docs</a></li>
    </ul>
  `,
})
export class DemoDashboardComponent {
  /* private demos = demoRoutes.slice(1); */
  /* public randomDemo: any;

  randomRoute(routes, path = '') {
    const random = routes[Math.floor(Math.random() * routes.length)];
    if (!random.children) {
      return path + '/' + random.path;
    }
    return this.randomRoute(random.children, path + '/' + random.path);
  } */

  appendChildRoute(route) {
    this.route.routeConfig.children = this.route.routeConfig.children || [];
    this.route.routeConfig.children.push(route);
    this.router.resetConfig(this.router.config);

    /*this.router.config.push({
      path: 'test', component: ListDemoComponent,
      outlet: 'test'
    });*/
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    /* this.randomDemo = [this.randomRoute(this.demos)]; */
  }
}
