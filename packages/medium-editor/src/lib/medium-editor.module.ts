import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MediumEditorComponent } from './medium-editor.component';

export const mediumModuleConfig = {
  imports: [CommonModule],
  exports: [MediumEditorComponent],
  declarations: [MediumEditorComponent],
  providers: [],
};

@NgModule(mediumModuleConfig)
export class MediumEditorModule {}
