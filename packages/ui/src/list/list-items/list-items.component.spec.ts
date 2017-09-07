import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemsComponent } from '../../../index';
import { InputComponent } from '../../io/input/input.component';
import { OutputComponent } from '../../io/output/output.component';

interface ListItem {
  name: string;
}

describe('ListItemsComponent', () => {
  let component: ListItemsComponent<ListItem>;
  let fixture: ComponentFixture<ListItemsComponent<ListItem>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemsComponent, InputComponent, OutputComponent]
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
