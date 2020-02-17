import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsComponent } from '../../utility/tabs/tabs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TabComponent, LoginFormComponent, SignupFormComponent, FocusDirective, KeycommandsService } from '@ec.components/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IoModule } from '@ec.components/ui/lib/io/io.module';
import { CommonModule } from '@angular/common';

describe('TabComponent', () => {
  /* let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>; */
  let tabsFix: ComponentFixture<TabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {
        declarations: [TabsComponent, TabComponent, LoginFormComponent, SignupFormComponent, FocusDirective],
        imports: [FormsModule, ReactiveFormsModule, IoModule, CommonModule, RouterTestingModule],
        providers: [KeycommandsService],
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
