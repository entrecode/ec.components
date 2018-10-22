import { Component } from '@angular/core';
import { ModelConfigService } from '@ec.components/data';

@Component({
  templateUrl: './entry-pop-demo.component.html',
})
export class EntryPopDemoComponent {
  popConfig = {
    fields: {
      name: {
        label: 'Name im POP!'
      },
      amazement_factor: {
        columns: 6
      },
      test_asset: {
        columns: 6
      }
    }
  }

  constructor(public modelConfig: ModelConfigService) {
    this.modelConfig.set('muffin', {
      fields: {
        id: {
          hidden: true
        },
        name: {
          label: 'Name..'
        },
        amazement_factor: {
          label: 'amazement_factorororororor'
        },
        test_asset: {
          label: 'test asset'
        }
      }
    });
  }
}
