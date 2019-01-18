import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from '../../utility/tabs/tabs.component';
import { TabComponent } from '../../utility/tab/tab.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TabComponent', () => {
  /* let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>; */
  let tabsFix: ComponentFixture<TabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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