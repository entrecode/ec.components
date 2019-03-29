export const formTemplate = `<form novalidate [formGroup]="group" (ngSubmit)="submit()" *ngIf="group">
  <div #wrapper>
    <ng-content></ng-content>
  </div>
  <div *ngIf="!wrapper.children.length&&!empty">
    <div data-grid>
      <div [attr.data-col]="field?.getColumns()" *ngFor="let field of form?.fields | visibleFields:form"
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
    <ec-loader class="ec-loader ec-loader_overlay ec-loader_global" #formLoader></ec-loader>
  </div>
</form>`;
