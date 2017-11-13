import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ListHeaderComponent } from '../../../index';
import { FormModule } from '../../form/form.module';
import { LoaderModule } from '../../loader/loader.module';
import { NotificationsModule } from '../../notifications/notifications.module';
import { PopModule } from '../../pop/pop.module';
import { PopComponent } from '../../pop/pop.component';
import { List } from '../../../../core/index';

describe('ListHeaderComponent', () => {
  let component: ListHeaderComponent;
  let fixture: ComponentFixture<ListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormModule, LoaderModule, PopModule, NotificationsModule],
      declarations: [ListHeaderComponent],
      providers: []
    })
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
