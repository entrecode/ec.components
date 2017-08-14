import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ListHeaderComponent } from '..';
import { FormComponent } from '../form/form.component';
import { InputComponent } from '../input/input.component';
import { OutputComponent } from '../output/output.component';
import { PopComponent } from '../pop/pop.component';
import { LoaderService } from '../loader/loader.service';
import { NotificationsService } from '../notifications/notifications.service';

describe('ListHeaderComponent', () => {
  let component: ListHeaderComponent;
  let fixture: ComponentFixture<ListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PopComponent, InputComponent, OutputComponent, FormComponent, ListHeaderComponent],
      providers: [LoaderService,
        {
          provide: 'useDesktopNotifications',
          useValue: false
        }, NotificationsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
