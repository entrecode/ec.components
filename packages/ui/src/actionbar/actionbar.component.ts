import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { WithLoader } from '../loader/with-loader.interface';

export type PromisedChildren = ((data: any, query: string) => Promise<Array<Action>>);
export type ActionLabel = string | ((resource: any) => string);
export type ActionTask = (action: Action, query?: string) => any;
export interface Action {
    label: ActionLabel,
    keywords?: string,
    children?: Array<Action> | PromisedChildren,
    task?: ActionTask,
    data?: any,
    sticky?: boolean,
    path?: Array<Action>
}
@Component({
    selector: 'ec-actionbar',
    templateUrl: './actionbar.component.html'
})

export class ActionbarComponent implements OnInit, WithLoader {
    displayedActions: any;
    actions: any;
    @Input() action;
    @ViewChild(LoaderComponent) loader: LoaderComponent;
    path = [];
    query = '';
    listConfig = { disableSelection: true, disableHeader: true, fields: { label: { label: '' } } };

    private change = new Subject();
    /** Observable that is nexted when the query has changed. */
    public change$: Observable<any> = this.change.asObservable();

    constructor() {
        this.change.debounceTime(200).subscribe((query: string) => {
            this.loadChildren(this.action, query);
        })
    }

    ngOnInit() {
        this.perform(this.action);
    }

    typed(query) {
        this.change.next(query);
    }

    filter(query = this.query) {
        if (query) {
            this.displayedActions = this.actions
                .filter(action => action.sticky || action.label.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        } else {
            this.displayedActions = this.actions;
        }
    }

    select(item) {
        this.perform(item.getBody());
    }

    perform(action, skip = false) {
        console.log('perform', action);
        this.action = action;
        if (!skip) {
            action.path = [].concat(this.path);
            this.path.unshift(action);
        }
        if (typeof action.task === 'function') {
            action.task.call(this, action, this.query)
        }
        this.query = '';
        this.loadChildren(action);
    }

    loadChildren(action = this.action, query = this.query) {
        if (Array.isArray(action.children)) {
            this.actions = action.children;
            this.filter();
        } else if (typeof action.children === 'function') {
            const promise = action.children(action, this.query)
                .then((children) => {
                    this.actions = children;
                    this.filter();
                })
                .catch((err) => {
                    console.log('error', err);
                });
            this.loader.wait(promise);
        } else {
            this.actions = [];
            this.displayedActions = [];
        }
    }

    goBack() {
        if (this.path.length < 2) {
            return;
        }
        this.path.shift();
        this.perform(this.path[0], true);
    }
}
