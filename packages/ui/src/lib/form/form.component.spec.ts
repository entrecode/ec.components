import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import {
  SymbolModule,
  IconModule,
  SelectModule,
  ListModule,
  FormModule,
  LoaderModule,
  PopModule,
  NotificationsModule,
  UtilityModule
} from '@ec.components/ui';

describe('FormComponent', () => {
  let component: FormComponent<any>;
  let fixture: ComponentFixture<FormComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UtilityModule,
        NotificationsModule,
        PopModule,
        LoaderModule,
        FormModule,
        ListModule,
        SelectModule,
        IconModule,
        SymbolModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*   it('should create', () => {
      expect(component).toBeTruthy();
    }); */
});
