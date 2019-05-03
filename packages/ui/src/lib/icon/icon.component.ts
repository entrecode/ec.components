import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { IconService } from './icon.service';
import { Symbol } from '../symbol/symbol.interface';

/** Displays icons by name. If the matching Icon (from registry contains a content, the content is shown.
 * If not, is is expected to be a ec-icon.
 * <example-url>https://components.entrecode.de/ui/icons?e=1</example-url>
 */
@Component({
  selector: 'ec-icon',
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit, OnChanges {
  /** The name of the icon. An Icon with this name is expected to be present in the current iconService registry. */
  @Input() name: string;
  /** The resolved icon (by name) */
  icon: Symbol;
  constructor(private iconService: IconService) {}
  /** The component will resolve the icon from the current iconService registry. A warning is logged if no icon can be found. */
  resolve() {
    this.icon = this.iconService.get(this.name);
    if (!this.icon) {
      console.warn(`Icon ${this.name} cannot be found. Using the following icon registry:`, this.iconService.registry);
    }
  }
  ngOnInit() {
    this.resolve();
  }
  ngOnChanges() {
    this.resolve();
  }
}
