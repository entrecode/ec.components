import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ec-tinymce-demo',
  templateUrl: './tinymce-demo.component.html'
})
export class TinymceDemoComponent implements OnInit {

  html = '<h1>Demo</h1>';

  constructor() {
  }

  change(value) {
    console.log('change', value);
  }

  ngOnInit() {
  }

}
