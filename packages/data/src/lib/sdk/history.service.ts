import { Injectable } from '@angular/core';
import ModelResource from 'ec.sdk/lib/resources/datamanager/ModelResource';
import DataManagerResource from 'ec.sdk/lib/resources/datamanager/DataManagerResource';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { ResourceService } from '../resource-config/resource.service';
import { NotificationsService, LoaderService } from '@ec.components/ui';
import { Router } from '@angular/router';
import DataManager from 'ec.sdk/lib/DataManager';
import * as EventSource from 'eventsource/lib/eventsource-polyfill';

/** The HistoryService keeps track of live updates for models entries and datamanagers. */
@Injectable()
export class HistoryService {
  /** Current loaded histories */
  promises: { [relation: string]: Promise<any> } = {};
  /** EventSources that are active */
  eventSources: { [relation: string]: any } = {}; // EventSource[]

  constructor(
    public notificationService: NotificationsService,
    public loaderService: LoaderService,
    public router: Router,
    public resourceService: ResourceService,
  ) {}
  /** Toggles live updates on the resource and stores them under the given key.
   * The relation is passed through the Update instances on change. */
  toggle(
    resource: ModelResource | DataManagerResource | EntryResource,
    relation: string,
    key = this.router.url.split('?')[0],
  ) {
    if (this.promises[key] && !this.eventSources[relation]) {
      return this.promises[key];
    }
    this.disableUpdates(key);
    this.promises[key] = this.enableUpdates(resource, relation, key)
      .then((source) => {
        this.eventSources[key] = source;
      })
      .catch((error) => {
        delete this.promises[key];
      });
    this.loaderService.wait(this.promises[key]);
  }

  /** Closes the event stream for the given key */
  disableUpdates(key = this.router.url.split('?')[0]) {
    if (this.eventSources[key]) {
      this.eventSources[key].close();
      delete this.promises[key];
      delete this.eventSources[key];
      return;
    }
  }

  /** Enables Updates for the given resource. The relation is passed through the Update instances on change. */
  enableUpdates(
    resource: ModelResource | DataManagerResource | EntryResource,
    relation: string,
    key = this.router.url.split('?')[0],
  ) {
    if (!resource || !resource.newHistory) {
      throw new Error('cannot get history: no newHistory method found on given resource');
    }
    if (this.promises[key]) {
      return this.promises[key];
    }
    DataManager.enableHistoryEvents(EventSource);
    const loading = resource
      .newHistory()
      .then((source) => {
        source.addEventListener(
          'entryUpdated',
          (e) => {
            const data = JSON.parse(e.data);
            this.resourceService.changes.next({
              relation,
              type: 'put',
              identifier: data ? data.entryID : '',
            });
          },
          false,
        );
        source.addEventListener(
          'entryCreated',
          (e) => {
            const data = JSON.parse(e.data);
            this.resourceService.changes.next({
              relation,
              type: 'post',
              identifier: data ? data.entryID : '',
            });
          },
          false,
        );
        return source;
      })
      .catch((error) => {
        this.notificationService.emit({
          title: 'History Error',
          error,
        });
      });
    this.loaderService.wait(loading);
    return loading;
  }
}
