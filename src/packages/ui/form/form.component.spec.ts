import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent, InputErrorsComponent } from '..';
import { InputComponent } from '../input/input.component';
import { OutputComponent } from '../output/output.component';
import { LoaderModule } from '../loader/loader.module';
import { FormService } from './form.service';
import { NotificationsModule } from '../notifications/notifications.module';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoaderModule, NotificationsModule],
      declarations: [OutputComponent, FormComponent, InputComponent, InputErrorsComponent],
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
