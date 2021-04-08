import { Component, OnInit } from '@angular/core';
import { Item } from '@ec.components/core';
import { MediumEditorComponent } from '@ec.components/medium-editor';
@Component({
  selector: 'ec-medium-editor-demo',
  templateUrl: './medium-editor-demo.component.html',
})
export class MediumEditorDemoComponent implements OnInit {
  html = '<p>MEDIUM WORKS</p>';
  options = { toolbar: { buttons: ['bold', 'italic', 'underline', 'h1', 'h2', 'h3'] } };
  mediumForm = {
    fields: {
      text: {
        input: MediumEditorComponent,
      },
    },
  };
  formItem = new Item(
    {
      text: 'Hallo',
    },
    this.mediumForm
  );

  ngOnInit() {}
}
