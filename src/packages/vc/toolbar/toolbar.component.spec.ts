import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcToolbarComponent } from './toolbar.component';

describe('VcToolbarComponent', () => {
  let component: VcToolbarComponent;
  let fixture: ComponentFixture<VcToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
