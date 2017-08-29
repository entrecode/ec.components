import { Component } from '@angular/core';
import { DefaultInputComponent } from '../../../ui/form/default-input/default-input.component';

/** This component holds the input templates for all field types that can not be represented by the default input template. */
@Component({
  templateUrl: './asset-input.component.html',
})
export class AssetInputComponent extends DefaultInputComponent {

}
