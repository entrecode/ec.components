import { Component } from '@angular/core';
import { mocked } from '../../mocks/data';
import { NotificationsService } from '@ec.components/ui';
import { karlotto } from './karlotto';

@Component({
  selector: 'ec-select-demo',
  templateUrl: './select-demo.component.html',
})
export class SelectDemoComponent {
  customDisplayConfig = {
    display: (items) => {
      return items.filter((item) => item.getBody() !== 'four');
    },
  };

  prefilledFour = ['four'];

  values = [];
  products = mocked.lists.products;
  saloon = {
    id: 'saloon',
    title: 'Enter Saloon',
    children: [
      {
        id: 'drink',
        title: 'Drink Beer',
        select: false,
        action: () => alert('Now you are drunk'),
      },
      {
        id: 'fight',
        title: 'Start fight',
        action: (item, bar) => {
          alert('Now you are dead');
          bar.reset();
        },
      },
    ],
  };
  bank = {
    id: 'bank',
    title: 'Rob Bank',
    action: (item, bar) => {
      alert('You WIN!');
      bar.reset();
    },
  };
  actions = [
    {
      id: 'west',
      title: 'West',
      children: [
        {
          id: 'shoot',
          title: 'Shoot',
          select: false,
          action: () => alert('PENG. Nothing happens'),
        },
        this.saloon,
        this.bank,
      ],
    },
    {
      id: 'south',
      title: 'South',
      children: [
        {
          id: 'blues',
          title: 'Play Blues',
          select: false,
          action: (item, bar) => {
            alert('Your guitar is broken... :(');
          },
        },
        {
          id: 'chicago',
          title: 'Visit Chicago',
          children: [this.saloon, this.bank],
        },
      ],
    },
  ];
  otto;
  ottostart: any[];
  tagSelect = [
    {
      id: 'west',
      title: 'West',
      children: [
        {
          id: 'shoot',
          title: 'Shoot',
          select: false,
          action: () => alert('PENG. Nothing happens'),
        },
        this.saloon,
        this.bank,
      ],
    },
  ];

  constructor(public notificationService: NotificationsService) {
    console.log('karlott', karlotto);
    this.otto = karlotto.map((line, i) => ({
      id: i,
      title: line,
      select: false,
      children: [],
    }));
    this.otto.forEach((action, i) => {
      action.children = [this.otto[(i + 1) % this.otto.length]];
    });
    this.ottostart = [this.otto[0]];
  }

  toggle(item, selection) {
    console.log('toggle', item, selection);
    this.notificationService.emit({
      type: 'info',
      title: 'Toggle item ' + item.display(),
      message: 'You could now run custom remove logic or forbid removing specific items etc.',
    });
    // selection.toggle(item);
  }

  log(x) {
    console.log(x);
  }

  createNew(q, bar) {
    console.log('q', q);
    /* bar.selection.add({
      id: 'newitem',
      title: q
    }) */
    bar.reload();
  }
}
