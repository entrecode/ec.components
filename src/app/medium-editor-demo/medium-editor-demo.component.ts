import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ec-medium-editor-demo',
  templateUrl: './medium-editor-demo.component.html',
})
export class MediumEditorDemoComponent implements OnInit {
  html = '<p>MEDIUM WORKS</p>';
  options = { toolbar: { buttons: ['bold', 'italic', 'underline', 'h1', 'h2', 'h3'] } };

  constructor() {}

  ngOnInit() {}
}
