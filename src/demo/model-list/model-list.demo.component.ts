import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `
  <h2>Model List</h2>
  <ec-loader #listLoader class="blend"></ec-loader>
  <ec-notifications class="toast"></ec-notifications>
  <ec-model-list [datamanager]="datamanagerID" [loader]="listLoader" [config]="{size:9,disableSelection:true}" (select)="select($event)" #dmList></ec-model-list>
  <ec-pop class="sidebar-right" #dmPop>
  <button type="button" (click)="dmPop.hide()">
    <i class="ec-icon close"></i>
  </button>
  <ec-form [config]="dmList.list?.config" (submit)="save(dmForm.form?.getBody())" #dmForm></ec-form>  
</ec-pop>
`
})
export class ModelListDemoComponent {
  private datamanagerID: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(({ datamanagerID }) => {
      if (datamanagerID) {
        this.datamanagerID = datamanagerID;
      }
    })
  }

  select(model) {
    this.router.navigate(['./', model.getBody().title], { relativeTo: this.activatedRoute });
    console.log('select', model);
    // dmForm.edit($event);dmPop.show()
  }
}
