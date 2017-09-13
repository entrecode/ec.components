import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ec-medium-editor-demo',
  templateUrl: './medium-editor-demo.component.html'
})
export class MediumEditorDemoComponent implements OnInit {

  model = '<p>MEDIUM WORKS</p>';

  constructor() {
  }

  ngOnInit() {
  }

}
