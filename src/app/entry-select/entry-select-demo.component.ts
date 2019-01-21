import { Component } from '@angular/core';

@Component({
  templateUrl: 'entry-select-demo.component.html',
})
export class EntrySelectDemoComponent {
  selectedMuffins: Array<any>;
  customDisplay = {
    display: (items) => {
      return items.filter(item => item.getBody()._entryTitle !== 'best muffin ever');
    }
  };

  constructor() {
  }

  toggle(item) {
    console.log('toggle', item);
  }
}
