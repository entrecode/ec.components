export const formTemplate = `
  <form novalidate [formGroup]="group" (ngSubmit)="submit()" *ngIf="group">
    <div #wrapper>
      <ng-content></ng-content>
    </div>
    <div *ngIf="!wrapper.children.length&&!empty">
      <div data-grid>
        <div
          [attr.data-col]="getColumns(field)"
          *ngFor="let field of form?.fields | visibleFields:form"
          [ngSwitch]="field?.getView('input')"
          [attr.data-type]="field?.type"
        >
          <div [ngClass]="'ec-field-group_' + field?.getView('input') + ' ' + field?.classes"
          [class.is-read-only]="formService.isReadOnly(field, form)" class="field-group">
            <label
              *ngIf="showLabel(field, form)"
              [for]="field.id"
              [title]="field.property"
              class="field-group__label"
              >{{field.label || field.property}}<i *ngIf="showTitle(field,form)"> {{field.property}}</i></label
            >
            <ec-input
              [field]="field"
              [group]="group"
              [item]="form"
              [component]="field.getComponent('form')||field.input"
              [formControl]="group.get(field.property)"
            ></ec-input>
            <p *ngIf="field.description && field.showDescription">{{field.description}}</p>
          </div>
        </div>
      </div>
      <button
        type="button"
        (click)="submit()"
        *ngIf="showSubmitButton()"
        [disabled]="group.invalid"
        class="btn btn_save"
      >
        <ec-icon name="save" *ngIf="!config?.submitButtonLabel"></ec-icon>
        <span *ngIf="config?.submitButtonLabel"
          >{{config.submitButtonLabel}}</span
        >
      </button>
      <ec-loader
        class="ec-loader loader is-global"
        #formLoader
      ></ec-loader>
    </div>
  </form>
`;
