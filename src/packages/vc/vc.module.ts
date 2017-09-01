// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe-html.pipe';
import { EditorComponent } from './editor/editor.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

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
    CommonModule,
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