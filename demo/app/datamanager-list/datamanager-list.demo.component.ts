import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `<h2>Datamanager List</h2>
  <ec-loader #listLoader class="ec-loader ec-loader_overlay ec-loader_global"></ec-loader>
  <ec-notifications class="toast"></ec-notifications>
  <ec-datamanager-list [loader]="listLoader" [config]="{size:9,disableSelection:true}"
  (select)="select($event)" #dmList></ec-datamanager-list>
  <ec-pop class="ec-pop_drawer-right" #dmPop>
    <button type="button" (click)="dmPop.hide()">
      <i class="ec-icon close"></i>
    </button>
    <ec-form [config]="dmList.list?.config" #dmForm></ec-form>
  </ec-pop>`
})
export class DatamanagerListDemoComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  select(datamanager) {
    this.router.navigate(['./', datamanager.getBody().dataManagerID], { relativeTo: this.activatedRoute });
    // dmForm.edit($event);dmPop.show()
  }
}
