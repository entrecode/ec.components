import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ListComponent } from './list.component';
import { ListItemsComponent } from '../list-items/list-items.component';
import { ListHeaderComponent } from '../list-header/list-header.component';
import { GroupPipe } from './group.pipe';
import { Item } from '../../core/item/item';
import { mocked } from '../../../mocks/data';
import { Collection } from '../../core/collection/collection';
import { PaginationComponent } from '../pagination/pagination.component';
import { InputComponent } from '../input/input.component';
import { OutputComponent } from '../output/output.component';
import { FormComponent, NotificationsService } from "../index";
import { PopComponent } from '../pop/pop.component';
import { LoaderService } from '../loader/loader.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PopComponent, FormComponent, PaginationComponent, ListComponent, ListItemsComponent, ListHeaderComponent, GroupPipe, InputComponent, OutputComponent],
      providers: [LoaderService, {
        provide: 'useDesktopNotifications',
        useValue: false
      }, NotificationsService]
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

  it('should use collection input', () => {
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
  });

});
