import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import { SafeHtmlPipe } from '../safe-html.pipe';

describe('VcComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorComponent, SafeHtmlPipe],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
