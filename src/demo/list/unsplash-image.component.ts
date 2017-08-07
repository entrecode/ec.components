import { Component } from '@angular/core';

@Component({
  selector: 'ec-unsplash-image',
  templateUrl: './unsplash-image.component.html',
})
export class UnsplashImageComponent {

  constructor() {
  }

  ngOnChanges() {
    console.log('changed', this);
  }
}
