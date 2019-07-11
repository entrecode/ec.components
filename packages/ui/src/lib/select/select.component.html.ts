export const selectTemplate = `<div class="ec-select" [class.ec-select_solo]="solo"
[class.is-empty]="selection?.isEmpty()" (click)="activate($event)" [class.has-searchbar]="!config?.disableSearchbar">
  <ul class="ec-select-selection" dndDropzone (dndDrop)="onDrop($event)">
    <li *ngIf="config?.disableSearchbar&&selection?.isEmpty()">
      <span class="ec-select__placeholder">
        {{placeholder||'make your selection?...'}}
      </span>
    </li>
    <li *ngFor="let selected of selection?.display;let i = index" [dndDisableIf]="solo||config?.disableDrag"
      [class.is-dragged]="selected===dragged" [class.is-draggable]="solo||!config?.disableDrag" dndEffectAllowed="move"
      [dndDraggable]="i" (dndStart)="onDragStart(selected,$event,item)" (dndCanceled)="cancelDrag(selected,$event,item)"
      (dndEnd)="cancelDrag(selected,$event,item)" #item>
      <span [class.ec-select-selected]="!solo" [class.ec-select-selected_solo]="solo" (click)="clickItem(selected,$event)">
        {{selected.display()}}
        <a (click)="removeItem(selected,$event)" *ngIf="!config?.disableRemove">&times;</a>
      </span>
    </li>
    <li dndPlaceholderRef>
      <div class="drag-placeholder" style="width: 48px;"></div>
    </li>
    <li *ngIf="!config?.disableSearchbar" class="ec-select__searchbar">
      <ec-searchbar [autofocus]="false" [property]="config?.label" [placeholder]="placeholder"
        (focus)="focus($event)" (keypressed)="handleKey($event,dropdownList)" [focusEvent]="focusEvent"
        (queryChanged)="filterDropdownList(dropdownList,$event)"></ec-searchbar>
    </li>
  </ul>
  <ec-pop class="ec-select-options" [hideOnClickOutside]="true" #dropdown>
    <ec-loader class="ec-loader loader is-local" #dropdownLoader></ec-loader>
    <ec-list (changed)="searchbar.updatedList($event)" #dropdownList [list]="list" (columnClicked)="listItemClicked($event)"
      [selection]="selection"></ec-list>
  </ec-pop>
</div>`;
