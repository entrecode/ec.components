import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinymceComponent } from './tinymce.component';
import { tinymceModuleConfig } from '../tinymce.module';

describe('TinymceComponent', () => {
  let component: TinymceComponent;
  let fixture: ComponentFixture<TinymceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(tinymceModuleConfig).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinymceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
