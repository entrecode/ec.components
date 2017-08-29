import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PublicSignupComponent } from './public-signup.component';
import { PublicService } from '../../data/sdk/public.service';
import { UiModule } from '../../ui/ui.module';
import { DataModule } from '../../data/data.module';

describe('PublicSignupComponent', () => {
  let component: PublicSignupComponent;
  let fixture: ComponentFixture<PublicSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, UiModule, DataModule],
      declarations: [PublicSignupComponent],
      providers: [PublicService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
