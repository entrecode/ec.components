import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from '../select/select.component';
import { CommonModule } from '@angular/common';
import { ListModule, LoaderModule, ActionbarComponent } from '@ec.components/ui';
import { DndModule } from 'ngx-drag-drop';

describe('SelectComponent', () => {
  let component: SelectComponent<any>;
  let fixture: ComponentFixture<SelectComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ListModule, DndModule, LoaderModule],
      declarations: [SelectComponent, ActionbarComponent],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
