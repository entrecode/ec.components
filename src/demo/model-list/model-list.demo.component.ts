import { Component } from '@angular/core';

@Component({
  template: `
  <h2>Model List</h2>
  <ec-loader #listLoader class="blend"></ec-loader>
  <ec-notifications class="toast"></ec-notifications>
  <ec-model-list datamanager="73538731-4ac3-4a1a-b3b5-e31d09e94d42" [loader]="listLoader" [config]="{size:9,disableSelection:true}" (select)="dmForm.edit($event);dmPop.show()" #dmList></ec-model-list>
  <ec-pop class="sidebar-right" #dmPop>
  <button type="button" (click)="dmPop.hide()">
    <i class="ec-icon close"></i>
  </button>
  <ec-form [config]="dmList.list?.config" (submit)="save(dmForm.form?.getBody())" #dmForm></ec-form>  
</ec-pop>
`
})
export class ModelListDemoComponent {
  constructor() {
  }

  save(model) {
    model.save().then((res) => {
      console.log('saved', res);
    });
  }
}
