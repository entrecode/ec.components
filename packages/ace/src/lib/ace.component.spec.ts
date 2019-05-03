import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AceComponent } from './ace.component';
import { aceModuleConfig } from './ace.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AceComponent', () => {
  let component: AceComponent;
  let fixture: ComponentFixture<AceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      ...aceModuleConfig,
      imports: [...aceModuleConfig.imports, RouterTestingModule],
    }).compileComponents();
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
