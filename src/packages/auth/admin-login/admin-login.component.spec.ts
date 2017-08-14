import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminLoginComponent } from './admin-login.component';
import { UiModule } from '../../ui/ui.module';
import { AdminService } from '../../data/sdk/admin.service';
import { DataModule } from '../../data/data.module';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule, DataModule, ReactiveFormsModule],
      declarations: [AdminLoginComponent],
      providers: [AdminService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
