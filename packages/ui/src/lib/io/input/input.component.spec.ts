import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from '../../io/input/input.component';
import { DynamicSlotComponent } from '../dynamic-slot/dynamic-slot.component';

describe('FieldComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent, DynamicSlotComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect change', () => {
    /* component.property = 'name';
    const form = new Form({ name: 'Tom' });
    component.item = form;
    const field = form.getField('name'); */
    component.ngOnChanges();
    /* expect(component.field).toBeDefined(); */
  });
});
