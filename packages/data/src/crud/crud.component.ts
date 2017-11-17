/**
 * Created by felix on 26.05.17.
 */
import { Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudConfig } from './crud-config.interface';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { SdkService } from '../sdk/sdk.service';
import { Selection } from '@ec.components/core/selection/selection';
import { LoaderComponent } from '@ec.components/ui/src/loader/loader.component';
import { LoaderService } from '@ec.components/ui/src/loader/loader.service';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import 'rxjs/add/operator/switchMap';
import { merge } from 'rxjs/observable/merge';
import { AuthService } from '../auth/auth.service';
import { EntryPopComponent } from '../entry-pop/entry-pop.component';

/** The CrudComponent takes at least a model name to render an entry list with create/edit/delete functionality out of the box.
 * ```html
 * <ec-crud model="muffin"></ec-crud>
 * ```
 * */
@Component({
  selector: 'ec-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent<T> implements OnInit {
  /** The model that should be crud'ed. */
  @Input() model: string;
  /** CrudConfig for customization of the crud's UI.*/
  @Input() config: CrudConfig<T> = {};
  /** The selection that should be used */
  @Input() selection: Selection<T>;
  /** The EntryList inside the template. */
  @ViewChild(EntryListComponent) list: EntryListComponent;
  /** The Pop inside the template. */
  @ViewChild(EntryPopComponent) entryPop: EntryPopComponent;
  /** The lists loader */
  @ViewChild('listLoader') loader: LoaderComponent;
  /** Emits when a list element is clicked */
  @Output() select: EventEmitter<any> = new EventEmitter();
  /** Emits when the selection has changed */
  @Output() selected: EventEmitter<any> = new EventEmitter();

  constructor(private sdk: SdkService,
    private auth: AuthService,
    private loaderService: LoaderService,
    private notificationService: NotificationsService,
    @Optional() public router: Router,
    @Optional() public route: ActivatedRoute) {
    if (route) {
      merge(route.data, route.params, route.queryParams)
      .subscribe(({ model }) => {
        if (model) {
          this.model = model;
        }
      });
    }
  }

  ngOnInit() {
    this.auth.getAllowedMethods(this.model, this.config.methods)
    .then((methods) => {
      this.config.methods = methods;
    });
  }

  /** Returns true if the given method is part of the methods array (or if there is no methods array) */
  public hasMethod(method: string) {
    return this.config.methods && this.config.methods.indexOf(method) !== -1;
  }

  /** Returns true if the visible fields in the list differ from the visible fields in the form*/
  public mustReload(item) {
    return !Object.keys(item.config.fields).reduce((equal, property) => {
      return equal && (item.config.fields[property].list !== false || item.config.fields[property].form === false);
    }, true);
  }

  /** Loads the clicked entry item, depending on the configured levels. Reloads the entry if the form has fields the which list has not. */
  private loadEntry(item) {
    return Promise.resolve().then(() => {
      if (!this.config.alwaysLoadEntry && !this.mustReload(item) && (!this.config.levels || this.config.levels === 1)) {
        return item.getBody();
      }
      return this.sdk.api.entry(this.model, item.id(), { levels: this.config.levels || 1 })
    }).then((loadedEntry) => {
      this.entryPop.edit(loadedEntry);
    }).catch((err) => {
      console.log('error while loading entry to edit', err);
      this.notificationService.emit({
        title: 'Fehler beim Laden',
        error: err
      })
    });
  }

  /** Is called when an item in the list is clicked. */
  private selectEntry(item) {
    if (!item) {
      return;
    }
    if (this.select.observers.length) {
      this.select.emit(item);
      return;
    }
    this.loaderService.wait(this.loadEntry(item), this.loader);
  }

  /** Returns the pop class that should be used, either uses config.popClass or defaults to ec-pop_drawer-left. */
  getPopClass() {
    return this.config && this.config.popClass ? this.config.popClass : 'ec-pop_drawer-left';
  }
}
