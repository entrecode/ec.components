import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryListComponent } from './entry-list.component';
import { PaginationComponent } from '../../ui/pagination/pagination.component';
import { ListItemsComponent } from '../../ui/list/list-items/list-items.component';
import { ListComponent } from '../../ui/list/list.component';
import { ListHeaderComponent } from '../../ui/list/list-header/list-header.component';
import { GroupPipe } from '../../ui/list/group.pipe';

describe('EntryListComponent', () => {
  let component: EntryListComponent;
  let fixture: ComponentFixture<EntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, ListItemsComponent, GroupPipe,
        ListHeaderComponent, EntryListComponent, PaginationComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
