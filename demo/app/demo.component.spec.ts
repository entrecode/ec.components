import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoComponent } from './demo.component';
import { FormsModule } from '@angular/forms';
import { UiModule } from '../../packages/ui/index';
import { DataModule } from '../../packages/data/index';
import { RouterTestingModule } from '@angular/router/testing';
import { FilesModule } from '../../packages/data/src/files/files.module';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DemoComponent
      ],
      imports: [
        FormsModule,
        UiModule,
        RouterTestingModule,
        DataModule,
        FilesModule,
      ],
      providers: [
        { provide: 'environment', useValue: 'development' }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
