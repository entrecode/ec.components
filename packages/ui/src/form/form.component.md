# Form

```html
<ec-form [config]="mocked.lists.trees.config" [item]="mocked.lists.trees.id(0)"></ec-form>
```

## Templated

```html
<ec-form [config]="mocked.lists.trees.config"
         [item]="mocked.lists.trees.id(0)">
  <ec-input property="name">
    <ng-template let-field="field" let-group="group" let-value="value">
      <label [formGroup]="group">
        Custom Input
        <input type="text" [formControlName]="field.property">
      </label>
    </ng-template>
  </ec-input>
</ec-form>
```