import { Component, OnInit } from '@angular/core';
import { SdkService, ResourceConfig } from '@ec.components/data';
import DataManagerResource from 'ec.sdk/lib/resources/datamanager/DataManagerResource';

@Component({
  selector: 'ec-resource-form-demo',
  templateUrl: 'resource-form-demo.component.html',
})
export class ResourceFormDemoComponent implements OnInit {
  datamanager: DataManagerResource;
  constructor(public sdk: SdkService, public resourceConfig: ResourceConfig) {
    this.resourceConfig.set('dataManager', {
      fields: {
        ...this.resourceConfig.get('dataManager')
          .fields /* ,
                test: {
                    label: 'Test Field (added via resourceConfig.set)'
                }, */,
      },
    });
    console.log('datamanager config', this.resourceConfig.get('dataManager'));
  }

  async ngOnInit() {
    await this.sdk.ready;
    this.datamanager = await this.sdk.datamanager.dataManager('73538731-4ac3-4a1a-b3b5-e31d09e94d42');
    console.log('datamanager', this.datamanager);
  }

  submit(form) {
    console.log('before submit:', form.group.value);
    form.submit();
  }

  saved(i) {
    console.log('saved:', i.getBody().description);
  }
}
