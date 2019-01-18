import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinymceDemoComponent } from './tinymce-demo.component';
import { demoModuleConfig } from '../demo.module';

describe('TinymceDemoComponent', () => {
  let component: TinymceDemoComponent;
  let fixture: ComponentFixture<TinymceDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(demoModuleConfig)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinymceDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
