import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemsComponent } from '..';
import { FieldComponent } from '../input/input.component';

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemsComponent, FieldComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
