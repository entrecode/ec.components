import { async, TestBed } from '@angular/core/testing';
import { DemoComponent } from './demo.component';
import { FormsModule } from '@angular/forms';
import { AppModule } from './demo.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { UiModule } from '@ec.components/ui';
import { DataModule } from '@ec.components/data';
describe('AppComponent', () => {
  beforeEach(async(() => {
    console.log('describe', AppModule);
    TestBed.configureTestingModule({
      declarations: [
        DemoComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        UiModule,
        DataModule
      ],
      providers: [
        { provide: 'environment', useValue: 'development' }
      ],
    }).compileComponents();
  }));
});
