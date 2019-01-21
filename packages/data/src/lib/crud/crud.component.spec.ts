import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { dataModuleConfig } from '../data.module';
import { CrudComponent } from './crud.component';

describe('CrudComponent', () => {
  let component: CrudComponent<any>;
  let fixture: ComponentFixture<CrudComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(dataModuleConfig)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});