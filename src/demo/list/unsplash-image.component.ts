import { Component } from '@angular/core';

@Component({
  selector: 'ec-unsplash-image',
  template: `
<div *ngIf="!group&&item" class="ec-list-avatar">
  <img width="80" height="80"
       [src]="'https://source.unsplash.com/random/'+item.display(field.property)*2+'x'+item.display(field.property)*2">
</div>
  `

})
export class UnsplashImageComponent {

  constructor() {
  }
}
