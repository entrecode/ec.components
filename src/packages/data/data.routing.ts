import { EditorComponent } from './editor.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const dataRoutes = [
  {
    path: 'wurst',
    component: EditorComponent
  },
  {
    path: 'cheese',
    component: EditorComponent
  }/*,
  {
    path: '', redirectTo: 'wurst', pathMatch: 'full'
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(dataRoutes)],
  exports: [RouterModule]
})
export class DataRoutingModule {
}