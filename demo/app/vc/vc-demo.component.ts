import { Component } from '@angular/core';
import { EditorComponent } from '../../../packages/vc';

@Component({
  selector: 'ec-vc-demo',
  templateUrl: './vc-demo.component.html',
})
export class VcDemoComponent {
  editor: EditorComponent;
  constructor() {
    console.log('vc demo');
  }

  update(editor) {
    this.editor = editor;
  }

  // tslint:disable-next-line:member-ordering
  json = {
    type: 'block',
    content: [
      {
        type: 'headline',
        settings: {
          level: 1
        },
        content: 'Hello'
      },
      {
        type: 'paragraph',
        content: 'parent...?'
      },
      {
        type: 'paragraph',
        settings: {
          class: ['class1', 'class2']
        },
        content: [
          'child',
          {
            type: 'strong',
            settings: {
              class: ['extrastrong'],
            },
            content: 'grandchild',
          },
          'toy\n'
        ],
      }
    ]
  };

  /*json = {
   type: 'block',
   content: [
   {
   type: 'paragraph',
   settings: {
   class: ['class1', 'class2']
   },
   content: [
   'child',
   {
   type: 'strong',
   settings: {
   class: ['extrastrong'],
   },

   content: 'grandchild',
   },
   'toy'
   ],
   }
   ]
   };*/
}
