import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLoginComponent } from './public-login.component';
import { UiModule } from '@ec.components/ui/ui.module';
import { DataModule } from '../../data.module';

describe('PublicLoginComponent', () => {
  let component: PublicLoginComponent;
  let fixture: ComponentFixture<PublicLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule, DataModule],
      declarations: [PublicLoginComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
