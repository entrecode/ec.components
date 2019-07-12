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
  newActions = ['Hello', 'Thats that'];

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

  vaderFight(stack?, actionbar?) {
    actionbar.placeholder = 'Darth Vader Appears! What will you do?';
    const weapon = actionbar.selection.id('weapon');
    return [
      {
        id: 'vader',
        select: false,
        health: 100,
        title: 'Attack with ' + weapon.resolve('title'),
        action: (vader, bar) => {
          if (weapon.resolve('hitChance') > Math.random()) {
            vader.body.health -= weapon.resolve('damage');
            if (vader.body.health <= 0) {
              bar.placeholder = 'You killed Darth Vader! YOU WIN!!!';
              bar.loadActions([{ title: 'Restart', id: 'restart', action: (a, b) => bar.reset() }]);
            } else {
              bar.placeholder = 'Darth Vader has been hit! (' + vader.resolve('health') + '/100)';
            }
          } else {
            bar.placeholder = 'You missed!';
          }
        },
      },
    ];
  }

  getWeapons(stack?, actionbar?) {
    console.log('weapon', stack, actionbar);
    const char = actionbar.selection.id('character');
    return [
      {
        id: 'weapon',
        title: 'Lightsaber',
        hitChance: 0.7,
        damage: 55,
        jedi: true,
        children: (s, a) => this.vaderFight(s, a),
      },
      {
        id: 'weapon',
        title: 'Blaster',
        damage: 30,
        hitChance: 0.4,
        children: (s, a) => this.vaderFight(s, a),
      },
    ].filter((w) => !w.jedi || !!char.resolve('jedi'));
  }

  asyncActions = (stack, actionbar) => {
    console.log('load', stack);
    actionbar.placeholder = 'select name';
    return [
      {
        id: 'character',
        title: 'Han Solo',
        children: (s, bar) => this.getWeapons(s, bar),
      },
      {
        id: 'character',
        title: 'Luke Skywalker',
        jedi: true,
        children: (s, bar) => this.getWeapons(s, bar),
      },
    ];
  };

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

  enter(q) {
    console.log('enter', q);
  }
}
