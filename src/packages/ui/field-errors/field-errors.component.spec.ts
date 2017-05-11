import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldErrorsComponent } from '..';

describe('FieldErrorsComponent', () => {
  let component: FieldErrorsComponent;
  let fixture: ComponentFixture<FieldErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FieldErrorsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
