import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponent } from './tab.component';
import { TabsComponent } from '../tabs/tabs.component';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  let tabsFix: ComponentFixture<TabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsComponent, TabComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    tabsFix = TestBed.createComponent(TabsComponent);
    // fixture = TestBed.createComponent(TabComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
