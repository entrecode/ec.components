import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AceComponent } from './ace.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@ec.components/ui';

describe('AceComponent', () => {
  let component: AceComponent;
  let fixture: ComponentFixture<AceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {
        imports: [UiModule, RouterTestingModule],
        declarations: [AceComponent],
        providers: [],
      }
    ).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
