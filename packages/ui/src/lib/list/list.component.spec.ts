import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { GroupPipe } from './group.pipe';
import { Item } from '@ec.components/core';
import { PaginationComponent } from './pagination/pagination.component';
import { FormModule } from '../form/form.module';
import { PopModule } from '../pop/pop.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { LoaderModule } from '../loader/loader.module';
import { IconModule } from '../icon/icon.module';
import { SymbolModule } from '../symbol/symbol.module';
/* import { mocked } from '../../mocks/data'; */

describe('ListComponent', () => {
  let component: ListComponent<any>;
  let fixture: ComponentFixture<ListComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SymbolModule, LoaderModule, FormModule, IconModule, PopModule, NotificationsModule, ReactiveFormsModule],
      declarations: [PaginationComponent, ListComponent, ListItemsComponent, ListHeaderComponent, GroupPipe],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnChanges();
  });

  it('should detect change to items and create a list', () => {
    component.items = ['a', 'b', 'c'].map((i) => new Item(i));
    component.ngOnChanges();
    expect(component.list).toBeDefined();
    expect(component.list.items.length).toBe(component.items.length);
    expect(component.selection).toBeDefined();
  });

  /* it('should support selectNext and selectPrevious', () => {
    component.list = mocked.lists.trees;
    component.ngOnChanges();
    expect(component.list.items[0].getBody().name).toBe('Appletree');
    expect(component.selection.items.length).toBe(0);
    component.selectNext();
    expect(component.selection.items.length).toBe(1);
    expect(component.selection.items[0].getBody().name).toBe('Appletree');
    component.selectNext();
    expect(component.selection.items.length).toBe(1);
    expect(component.selection.items[0].getBody().name).toBe('Lemontree');
    component.selectPrev();
    expect(component.selection.items.length).toBe(1);
    expect(component.selection.items[0].getBody().name).toBe('Appletree');
    component.selection.removeAll();
    expect(component.selection.items.length).toBe(0);
    component.selectPrev();
    expect(component.selection.items.length).toBe(1);
    expect(component.selection.items[0].getBody().name).toBe('ba');
    component.selectPrev();
    expect(component.selection.items.length).toBe(1);
    expect(component.selection.items[0].getBody().name).toBe('aa');
  }); */

  // TODO fix
  /*it('should use collection input', () => {
    component.collection = new Collection(mocked.muffins);
    component.ngOnChanges();
    expect(component.list).toBeDefined();
    expect(component.list.items.length).toBe(mocked.muffins.length);
    expect(component.selection).toBeDefined();
  });

  it('should toggle selection on columnClick', () => {
    component.collection = new Collection(mocked.products);
    component.ngOnChanges();
    component.columnClick(component.list.items[0]);
    expect(component.selection.has(component.list.items[0])).toBeTruthy();
    component.columnClick(component.list.items[0]);
    expect(component.selection.has(component.list.items[0])).toBeFalsy();
  });

  it('should support custom select', () => {
    component.collection = new Collection(mocked.products);
    component.ngOnChanges();
    let selected;
    component.select.subscribe((item) => {
      selected = item;
    });
    component.columnClick(component.list.items[0]); //selection should not change
    expect(component.selection.has(component.list.items[0])).toBeFalsy();
    expect(selected).toBe(component.list.items[0]);
  });*/

});