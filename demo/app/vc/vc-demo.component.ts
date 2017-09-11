import { Component } from '@angular/core';
import { EditorComponent } from '../../../packages/vc/index';

@Component({
  selector: 'ec-vc-demo',
  template: require('./vc-demo.component.html'),
})
export class VcDemoComponent {
  constructor() {
    console.log('vc demo');
  }

  update(editor) {
    this.editor = editor;
  }

  editor: EditorComponent;
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
