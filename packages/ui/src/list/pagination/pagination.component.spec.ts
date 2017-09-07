import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from '../../../index';
import { Pagination } from '@ec.components/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent<number>;
  let fixture: ComponentFixture<PaginationComponent<number>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen to change', () => {
    component.pagination = new Pagination();
    component['ngOnChanges']();
    component.pagination.setTotal(1000);
    component.pagination.next();
    expect(component['translation']).toBeDefined();
    expect(component.isVisible(1)).toBe(true);
    expect(component.isVisible(10)).toBe(false);
  });
});
