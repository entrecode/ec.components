import { Component } from '@angular/core';
import { DefaultInputComponent } from '@ec.components/ui';

@Component({
  selector: 'ec-unsplash-image',
  template: `
<div *ngIf="!group&&!!item" class="ec-list-avatar">
  <img width="80" height="80"
       [src]="'https://source.unsplash.com/random/'+item.display(field.property)*2+'x'+item.display(field.property)*2">
</div>
  `

})
export class UnsplashImageComponent extends DefaultInputComponent {
}
