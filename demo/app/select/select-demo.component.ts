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

  constructor(public notificationService: NotificationsService) {
    console.log('list', this.products);
  }

  onRemove(item, selection) {
    console.log('remove', item, selection);
    this.notificationService.emit({
      type: 'info',
      title: 'Remove item ' + item.display(),
      message: 'You could now run custom remove logic or forbid removing specific items etc.'
    });
    selection.remove(item);
  }

  log(x) {
    console.log(x)
  }
}
