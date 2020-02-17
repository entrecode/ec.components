import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TabsComponent } from '../../utility/tabs/tabs.component';
import { TabComponent, LoginFormComponent, SignupFormComponent, FocusDirective, IoModule } from '@ec.components/ui';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { KeycommandsService } from '../keycommands/keycommands.service';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  /* let children: Array<TabComponent>; */

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {
        declarations: [TabsComponent, TabComponent, LoginFormComponent, SignupFormComponent, FocusDirective],
        imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, IoModule, CommonModule],
        providers: [KeycommandsService],
      }
    ).compileComponents();
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
