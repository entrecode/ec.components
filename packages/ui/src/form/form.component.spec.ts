import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent, InputErrorsComponent } from '../..';
import { InputComponent } from '../io/input/input.component';
import { OutputComponent } from '../io/output/output.component';
import { LoaderModule } from '../loader/loader.module';
import { FormService } from './form.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { VisibleFieldsPipe } from './visible-fields.pipe';
import { IconModule } from '../icon/icon.module';
import { SymbolModule } from '../symbol/symbol.module';

describe('FormComponent', () => {
  let component: FormComponent<any>;
  let fixture: ComponentFixture<FormComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoaderModule, NotificationsModule, IconModule, SymbolModule],
      declarations: [OutputComponent, FormComponent, InputComponent, InputErrorsComponent, VisibleFieldsPipe],
      providers: [FormService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
