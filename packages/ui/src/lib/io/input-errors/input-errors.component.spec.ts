import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputErrorsComponent } from '../../io/input-errors/input-errors.component';
import { SymbolService } from '../../symbol/symbol.service';

describe('InputErrorsComponent', () => {
  let component: InputErrorsComponent;
  let fixture: ComponentFixture<InputErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputErrorsComponent],
      providers: [SymbolService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
