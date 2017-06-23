import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EditorComponent, ToolbarComponent } from './index';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  entryComponents: [
    EditorComponent,
    ToolbarComponent,
  ],
  declarations: [
    EditorComponent,
    ToolbarComponent,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    EditorComponent,
    ToolbarComponent,
    SafeHtmlPipe,
  ],
  providers: [],
})
export class VcModule {
}