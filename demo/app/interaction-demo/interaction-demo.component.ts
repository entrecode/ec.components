import { Component } from '@angular/core';
import { SdkService } from '../../../packages/data/src/sdk/sdk.service';
import { Apps } from 'ec.sdk';
import { environment } from '../../environments/environment';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import { Action, ActionLabel, ActionTask, PromisedChildren } from '../../../packages/ui/src/actionbar/actionbar.component';
import { NotificationsService } from '../../../packages/ui/src/notifications/notifications.service';
import { Interaction } from '../../../packages/core/src/interaction/interaction';


@Component({
  templateUrl: './interaction-demo.component.html'
})
export class InteractionDemoComponent {
  interaction: Interaction<any> = new Interaction({
    key: 'Enter a few words',
    activate: (i) => {
      i.addChild(new Interaction({ key: 'height' }))
    },
    children: [new Interaction({
      key: 'Submit',
      data: { heading: 'Choose your favorite' },
      children: [new Interaction({
        key: 'I dont care',
        activate: (i) => {
          i.parent.go(i.parent);
        }
      })],
      activate: (i => {
        console.log('name entered..', i.root.data);
        i.addChildren(i.root.data['query'].split(' ').map(word => new Interaction({ key: word })));
      })
    }), new Interaction({
      key: 'Skip'
    })]
  });


  editor: Interaction<any> = new Interaction({
    key: 'editor',

  })

  constructor(private sdk: SdkService, private notifications: NotificationsService) {
  }
}
