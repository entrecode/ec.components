import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { List } from '@ec.components/core';
import { ListHeaderComponent } from '../../list/list-header/list-header.component';
import { PopComponent } from '../../pop/pop.component';
import { uiModuleConfig } from '../../ui.module';

describe('ListHeaderComponent', () => {
  let component: ListHeaderComponent;
  let fixture: ComponentFixture<ListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(uiModuleConfig)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open edit filter pop', () => {
    const pop = TestBed.createComponent(PopComponent).componentInstance;
    component.editFilter(pop);
    expect(pop.active).toBeTruthy();
  });

  it('should apply filter', () => {
    component.list = new List([{ name: 'Muffin' }, { name: 'Tobi' }], { fields: { name: {} } });
    expect(component.list.page.length).toBe(2);
    component.applyFilter('name', 'Muff');
    expect(component.list.page.length).toBe(1);
  });
});
