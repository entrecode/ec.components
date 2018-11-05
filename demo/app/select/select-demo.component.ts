import { Component } from '@angular/core';
import { mocked } from '../../../mocks/data';
import { NotificationsService } from '@ec.components/ui';

@Component({
  selector: 'ec-select-demo',
  templateUrl: './select-demo.component.html',
})
export class SelectDemoComponent {

  customDisplayConfig = {
    display: (items) => {
      return items.filter(item => item.getBody() !== 'four');
    }
  }

  prefilledFour = ['four'];

  values = [];
  products = mocked.lists.products;

  actions = [{
    id: 'west',
    title: 'Go West',
    action: (item, bar) => {
      console.log('go west!');
      /* bar.selection.toggle(item); */
      bar.loadActions([
        {
          id: 'saloon',
          title: 'Enter Saloon'
        },
        {
          id: 'bank',
          title: 'Rob Bank'
        }
      ])
    }
  },
  {
    id: 'south',
    title: 'Go South',
    action: (item, bar) => {
      /* bar.selection.toggle(item); */
      console.log('go south!');
      bar.loadActions([
        {
          id: 'blues',
          title: 'Play Blues'
        },
        {
          id: 'chicago',
          title: 'Visit Chicago'
        }
      ])
    }
  }];

  constructor(public notificationService: NotificationsService) {
    console.log('list', this.products);
  }

  toggle(item, selection) {
    console.log('toggle', item, selection);
    this.notificationService.emit({
      type: 'info',
      title: 'Toggle item ' + item.display(),
      message: 'You could now run custom remove logic or forbid removing specific items etc.'
    });
    // selection.toggle(item);
  }

  log(x) {
    console.log(x)
  }
}
