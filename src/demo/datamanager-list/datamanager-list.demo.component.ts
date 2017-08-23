import { Component } from '@angular/core';

@Component({
  template: `
  <h2>Datamanager List</h2>
  <ec-loader #listLoader class="blend"></ec-loader>
  <ec-notifications class="toast"></ec-notifications>
  <ec-datamanager-list [loader]="listLoader" [config]="{size:9}" (select)="dmForm.edit($event);dmPop.show()" #dmList></ec-datamanager-list>
  <ec-pop class="sidebar-right" #dmPop>
  <button type="button" (click)="dmPop.hide()">
    <i class="ec-icon close"></i>
  </button>
  <ec-form [config]="dmList.list.config" (submit)="save(dmForm.form?.getBody())" #dmForm></ec-form>  
</ec-pop>
`
})
export class DatamanagerListDemoComponent {
  constructor() {
  }

  save(datamanager) {
    datamanager.save().then((res) => {
      console.log('saved', res);
    });
  }
}
