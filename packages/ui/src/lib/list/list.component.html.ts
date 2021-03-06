export const listTemplate = `<div class="ec-list">
  <ec-list-header [list]="list" [selection]="selection" *ngIf="showHeader()"></ec-list-header>
  <div class="ec-list-body">
    <div class="ec-list-group" *ngFor="let group of list?.groups">
      <div class="ec-list-group-header" *ngIf="group.value" (click)="selection?.toggleAll(listItems?.items)">
        <div class="ec-list-cell ec-list-item__selector" *ngIf="list?.config?.selectMode">
          <input type="checkbox" [checked]="selection?.hasAll(listItems?.items)">
        </div>
        <div class="ec-list-cell">
          <span class="ec-list-group-header__title">{{group.value}}</span>
        </div>
      </div>
      <ec-list-items [focusItem]="focusItem" [list]="list" [selection]="selection" (columnClicked)="columnClick($event)"
        #listItems [items]="list?.page | group: group.property: group.value"></ec-list-items>
    </div>

    <div class="ec-list-empty" *ngIf="list?.isEmpty()&&!isLoading">
      <div *ngIf="list?.isFiltered()">
        <div #noResults>
          <ng-content select="[data-ec-list-empty-filtered]"></ng-content>
        </div>
        <div *ngIf="!noResults?.children?.length">
          {{'list.filter.noResults' | symbol}}
          <a (click)="list.clearFilter()">{{'list.filter.reset' | symbol}}</a>
        </div>
      </div>
      <div *ngIf="!list.isFiltered()">
        <div #emptySlot>
          <ng-content select="[data-ec-list-empty]"></ng-content>
        </div>
        <div *ngIf="!emptySlot?.children?.length">
          {{'list.empty' | symbol}}
        </div>
      </div>
    </div>
    <div class="ec-list-empty" *ngIf="list?.isEmpty()&&isLoading">
      <div #loadingSlot>
        <ng-content select="[data-ec-list-loading]"></ng-content>
      </div>
      <div *ngIf="!loadingSlot?.children?.length">
        {{'list.loading' | symbol}}
      </div>
    </div>
  </div>
</div>
<ec-pagination [hidden]="list?.config?.hidePagination" [config]="paginationConfig" [pagination]="list?.pagination"></ec-pagination>`;
