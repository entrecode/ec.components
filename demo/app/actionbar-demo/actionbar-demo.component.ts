import { Component } from '@angular/core';
import { SdkService } from '../../../packages/data/src/sdk/sdk.service';
import { Apps } from 'ec.sdk';
import { environment } from '../../environments/environment';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import { Action, ActionLabel, ActionTask, PromisedChildren } from '../../../packages/ui/src/actionbar/actionbar.component';
import { NotificationsService } from '../../../packages/ui/src/notifications/notifications.service';



export interface ResourceAction {
  action: Action,
  key?: string, // key of data resource
  list: any, // ResourceList
  label: ActionLabel,
  task?: ActionTask,
  static?: Array<Action>,
  children?: Array<Action> | ((...args) => PromisedChildren)
}

@Component({
  templateUrl: './actionbar-demo.component.html'
})
export class ActionbarDemoComponent {
  action: Action;
  entry: any;
  model: any;

  constructor(private sdk: SdkService, private notifications: NotificationsService) {
    this.action = {
      label: 'root action',
      children: [
        {
          label: 'Datamanager',
          children: this.datamanagerActions()
        },
        {
          label: 'App',
          children: this.appActions()
        }
      ]
    };
  }

  resourceListAction(action: ResourceAction): Array<Action> {
    const children = action.list.getAllItems()
      .map((resource): Action => ({
        label: typeof action.label === 'function' ? action.label.call(this, resource) : resource[action.label],
        data: { [action.key || 'resource']: resource },
        task: action.task,
        children: typeof action.children === 'function' ? action.children.call(this, resource, action.action) : action.children
      }));
    return (action.static || []).concat(children);
  }

  datamanagerActions(): PromisedChildren {
    return (action, query) => this.sdk.datamanager.dataManagerList(
      Object.assign({}, query ? { title: { search: query } } : {})
    ).then(list => this.resourceListAction({
      action, list,
      label: 'title',
      children: this.modelActions,
      static: [{
        label: 'Liste anzeigen',
        task: (a) => console.log(action, 'list view!')
      },
      {
        label: 'Datamanager erstellen',
        task: (a) => console.log('create datamanager')
      }]
    }))
  }

  modelActions(dm): PromisedChildren {
    return (action, query) => dm.modelList(
      Object.assign({}, query ? { title: { search: query } } : {})
    ).then(list => this.resourceListAction({
      action, list,
      label: 'title',
      key: 'model',
      children: this.entryActions,
      static: [{
        label: 'Liste anzeigen',
        task: (a) => console.log(action, 'list view!')
      },
      {
        label: 'Model erstellen',
        task: (a) => console.log('create model')
      }]
    }))
  }

  appActions(): PromisedChildren {
    const apps = new Apps('stage');
    return (action, query) => apps.appList(
      Object.assign({}, query ? { title: { search: query } } : {})
    ).then(list => this.resourceListAction({ action, list, label: 'title' }))
  }

  entryActions(model, previous): PromisedChildren {
    return (action, query) => {
      action.data.api = new PublicAPI(previous.data.resource.shortID, 'stage');
      return action.data.api.entryList(model.title,
        Object.assign({}, query ? { [model.titleField]: { search: query } } : {})
      ).then(list => this.resourceListAction({
        action, list, label: '_entryTitle',
        task: (e) => {
          this.entry = e.data.resource;
        },
        static: [
          {
            label: 'Entry erstellen',
            task: (a) => console.log('create entry')
          }, {
            label: 'Entry ID laden',
            children: [
              {
                label: 'Entry ID eingeben...',
                sticky: true,
                task: (a, q) => {
                  if (!action.data || !action.data.api || !action.data.model) {
                    throw new Error('cannot find api or model in data');
                  }
                  action.data.api.entry(action.data.model.title, q)
                    .then(entry => {
                      this.entry = entry;
                    }).catch((error) => {
                      this.notifications.emit({ title: 'Entry kann nicht geladen werden', error });
                    });
                }
              }
            ]
          }]
      }))
    }
  }
}
