import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TabsComponent } from '../../utility/tabs/tabs.component';
import { utilityModuleConfig } from '../utility.module';


describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  /* let children: Array<TabComponent>; */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      ...utilityModuleConfig,
      imports: [
        ...utilityModuleConfig.imports,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent);

    // children = [0, 1, 2].map((tab) => TestBed.createComponent(TabComponent).componentInstance);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add a tab', () => {

    expect(component.selected).toBeUndefined();
    // component.add(children[0]);
    // expect(component.selected).toBe(children[0]);

  });
});
