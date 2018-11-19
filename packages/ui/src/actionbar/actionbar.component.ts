import { Component, OnInit, Input, ElementRef, ChangeDetectorRef } from '@angular/core';
import { SelectComponent } from '../select/select.component';
import { ListConfig, List, Item } from '@ec.components/core';

export interface Action {
    title: string;
    id: string;
    path?: string;
    data?: any,
    add?: boolean,
    action?: (item?: Item<Action>, actionbar?: ActionbarComponent) => any
}

export interface ActionbarConfig extends ListConfig<Action> {

}

@Component({
    selector: 'ec-actionbar',
    templateUrl: '../select/select.component.html'
})

export class ActionbarComponent extends SelectComponent<Action> implements OnInit {
    @Input() config: ActionbarConfig = {
        label: 'title',
        identifier: 'id',
        fields: {
            title: {}
        }
    }
    @Input() actions: Action[];
    actionStack: { [id: string]: Action[] } = {}

    constructor(
        public elementRef: ElementRef,
        public cdr: ChangeDetectorRef,
    ) {
        super(elementRef, cdr);
        /* this.toggleItem.asObservable().subscribe((item) => {
            console.log('item', item);
        }); */
        this.add.subscribe((item) => {
            if (item.getBody().add !== false) {
                this.selection.add(item);
            }
            if (item.getBody().action) {
                item.getBody().action(item, this);
            }
            if (item.getBody().children) {
                this.loadActions(item.getBody().children);
            }
        });
        this.remove.subscribe((item) => {
            this.selection.remove(item);
            const actionsBefore = this.actionStack[this.currentID()];
            if (actionsBefore) {
                this.loadActions(actionsBefore);
            }
        })
    }

    ngOnInit() {
        this.loadActions(this.actions);
    }

    currentID() {
        if (!this.selection || this.selection.isEmpty()) {
            return 'ROOT';
        }
        return this.selection.items[this.selection.items.length - 1].id();
    }

    reset() {
        this.selection.removeAll();
        this.loadActions(this.actionStack[this.currentID()])
    }

    loadActions(actions) {
        this.actionStack[this.currentID()] = actions;
        this.list = new List(actions, this.config);
        if (!this.selection) {
            this.initSelection();
        }
        setTimeout(() => {
            if (this.dropdownList) {
                this.dropdownList.focusFirst();
            }
        })
    }

    getPath() {
        return this.selection.getValue();
    }
}
