import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsComponent } from '../../utility/tabs/tabs.component';
import { utilityModuleConfig } from '../utility.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('TabComponent', () => {
  /* let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>; */
  let tabsFix: ComponentFixture<TabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      ...utilityModuleConfig,
      imports: [...utilityModuleConfig.imports, RouterTestingModule],
    }).compileComponents();
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
