import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ListHeaderComponent } from '../../../index';
import { FormModule } from '../../form/form.module';
import { LoaderModule } from '../../loader/loader.module';
import { NotificationsModule } from '../../notifications/notifications.module';
import { PopModule } from '../../pop/pop.module';

describe('ListHeaderComponent', () => {
  let component: ListHeaderComponent;
  let fixture: ComponentFixture<ListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormModule, LoaderModule, PopModule, NotificationsModule],
      declarations: [ListHeaderComponent],
      providers: []
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
