export const formTemplate = `<form novalidate [formGroup]="group" (ngSubmit)="submit()" *ngIf="group">
  <div #wrapper>
    <ng-content></ng-content>
  </div>
  <div *ngIf="!wrapper.children.length&&!empty">
    <div data-grid>
      <div [attr.data-col]="field?.getColumns()" *ngFor="let field of form?.fields | visibleFields:form"
      [class.is-hidden]="field.hideInForm"
      [ngClass]="'ec-form-group_' + field?.view + ' ' + field?.classes" [class.is-read-only]="formService.isReadOnly(field, form)"
        [ngSwitch]="field?.view" class="form-group" [attr.data-type]="field?.type">
        <label [for]="field.id" [title]="field.property">{{field.label || field.property}}</label>
        <ec-input [field]="field" [group]="group" [item]="form"
        [formControl]="group.get(field.property)"></ec-input>
      </div>
    </div>
    <button type="button" (click)="submit()" *ngIf="showSubmitButton()" [disabled]="group.invalid" class="btn btn_save">
      <ec-icon name="save" *ngIf="!config?.submitButtonLabel"></ec-icon>
      <span *ngIf="config?.submitButtonLabel">{{config.submitButtonLabel}}</span>
    </button>

    <div class="dropdown dropdown_left" tabindex="0" *ngIf="!form?.config?.disableColumnFilter">
      <a class="btn btn_invert">&#9776;</a>
        <ul class="dropdown-options">
          <li class="dropdown-option" *ngFor="let field of form?.fields"
            [class.is-active]="!field.hideInForm" [class.is-hidden]="field.hideInColumnFilter">
            <span (click)="toggleVisibility(field)">
              <ec-icon [name]="field.hideInForm?'square':'check-box'">{{field.getLabel()}}</ec-icon>
            </span>
          </li>
        </ul>
    </div>

    <ec-loader class="ec-loader ec-loader_overlay ec-loader_global" #formLoader></ec-loader>
  </div>
</form>`;
