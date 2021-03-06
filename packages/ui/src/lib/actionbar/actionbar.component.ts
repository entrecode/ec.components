import { ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Item, List, ListConfig } from '@ec.components/core';
import { SelectComponent } from '../select/select.component';
import { selectTemplate } from '../select/select.component.html';

export type ActionFunction = (item?: Item<Action> | any, actionbar?: ActionbarComponent) => any;

export interface Action {
  title: string;
  id: string;
  path?: string;
  data?: any;
  select?: boolean;
  action?: ActionFunction;
  children?: List<Action>;
}

export interface ActionbarConfig extends ListConfig<Action> {}

@Component({
  selector: 'ec-actionbar',
  template: selectTemplate,
})
export class ActionbarComponent extends SelectComponent<Action> implements OnInit {
  @Input() root = 'ROOT'; // id of root stack item
  @Input() config: ActionbarConfig = {
    label: 'title',
    identifier: 'id',
    fields: {
      title: {},
    },
  };
  @Input() actions: Action[];
  actionStack: { [id: string]: Action[] } = {};

  constructor(public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super(elementRef, cdr);
    this.add.subscribe((item) => {
      if (item.getBody().select !== false) {
        this.selection.add(item);
      }
      if (item.getBody().action) {
        item.getBody().action(item, this);
      }
      if (item.getBody().children) {
        this.loadActions(item.getBody().children);
      }
      // this.searchbar.clear();
    });
    this.remove.subscribe((item) => {
      this.selection.remove(item);
      this.loadActionsBefore();
    });
  }

  loadActionsBefore() {
    const actionsBefore = this.actionStack[this.currentID()];
    if (actionsBefore) {
      this.loadActions(actionsBefore);
    }
  }

  ngOnInit() {
    this.loadActions(this.actions);
  }

  currentID() {
    if (!this.selection || this.selection.isEmpty()) {
      return this.root;
    }
    return this.selection.items[this.selection.items.length - 1].id();
  }

  reset() {
    this.selection.removeAll();
    this.loadActions(this.actionStack[this.currentID()]);
  }

  currentActions() {
    return this.actionStack[this.currentID()];
  }

  async loadActions(actions, addToStack = true) {
    let resolved;
    if (typeof actions === 'function') {
      resolved = await Promise.resolve(actions(this.actionStack, this));
    } else {
      resolved = [].concat(actions);
    }
    if (addToStack) {
      this.actionStack[this.currentID()] = actions;
    }
    this.list = new List(resolved, { size: 1000, ...this.config });
    if (resolved.length > this.list.config) {
      console.warn('actions exceed list size...');
    }
    if (!this.selection) {
      this.initSelection();
    }
    setTimeout(() => {
      if (this.dropdownList) {
        this.dropdownList.focusFirst();
      }
    });
  }

  getPath() {
    return this.selection.getValue();
  }
}
