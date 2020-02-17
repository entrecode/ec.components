import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsDemoComponent } from './notifications-demo.component';
import { demoModuleConfig } from '../demo.module.config';


describe('NotificationsDemoComponent', () => {
  let component: NotificationsDemoComponent;
  let fixture: ComponentFixture<NotificationsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(demoModuleConfig).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
