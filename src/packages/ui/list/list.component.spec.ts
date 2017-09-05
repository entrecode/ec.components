import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ListComponent } from './list.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { GroupPipe } from './group.pipe';
import { Item } from '../../core/item/item';
import { mocked } from '../../../mocks/data';
import { Collection } from '../../core/collection/collection';
import { PaginationComponent } from './pagination/pagination.component';
import { FormModule } from '../form/form.module';
import { PopModule } from '../pop/pop.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { LoaderModule } from '../loader/loader.module';

describe('ListComponent', () => {
  let component: ListComponent<Item<string>>;
  let fixture: ComponentFixture<ListComponent<Item<string>>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LoaderModule, FormModule, PopModule, NotificationsModule, ReactiveFormsModule],
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


  //TODO fix
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
