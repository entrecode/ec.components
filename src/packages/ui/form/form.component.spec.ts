import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent, InputErrorsComponent } from '..';
import { InputComponent } from '../input/input.component';
import { OutputComponent } from '../output/output.component';
import { LoaderService } from '../loader/loader.service';
import { NotificationsService } from '../notifications/notifications.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [OutputComponent, FormComponent, InputComponent, InputErrorsComponent],
      providers: [LoaderService,
        {
          provide: 'useDesktopNotifications',
          useValue: false
        }, NotificationsService]
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
