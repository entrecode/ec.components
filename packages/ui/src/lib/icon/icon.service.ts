import { Injectable } from '@angular/core';
import { ecIcons } from './ec-icons';
import { Symbol } from '../symbol/symbol.interface';
import { SymbolService } from '../symbol/symbol.service';
/** Service to register icons and icon sets. The default set is ec-icons. (Requires including ec-icons)
 * <example-url>https://components.entrecode.de/ui/icons?e=1</example-url>
 */
@Injectable()
export class IconService extends SymbolService {
  /** The current icon set that is registered to the service. It will be used to resolve icons from. */
  public registry: Symbol[] = ecIcons;
}
