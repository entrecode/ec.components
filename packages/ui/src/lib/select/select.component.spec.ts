import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UiModule } from '../ui.module';
import { SelectComponent } from '../select/select.component';

describe('SelectComponent', () => {
  let component: SelectComponent<any>;
  let fixture: ComponentFixture<SelectComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
