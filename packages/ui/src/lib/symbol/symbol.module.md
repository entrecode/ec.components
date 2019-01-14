# Localization

You can setup localization via the SymbolService:

```typescript
import en from './en';

@Component({
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private symbols: SymbolService) {
   this.symbols.set(en);
  }
}
```

It is expected that you pass an array of [Symbol's](https://entrecode.github.io/ec.components/interfaces/Symbol.html) to SymbolService#set

## Date Localization

If you are using datepickers, you have to include the following line to your root component:

```typescript
moment.locale(this.symbols.resolve('moment.locale'));
```

## Using symbols in templates

To translate symbols in a template, use the symbol pipe:

```html
{{'symbol.language' | symbol}} <!-- prints your current selected language -->
```

## Overwriting

The names of the symbols act as unique identifier, meaning you can overwrite any preexisting symbols. The default preexisting symbols of ec.components can be looked up [here](https://components.entrecode.de/ui/symbols), or directly at the source: [EN](https://github.com/entrecode/ec.components/blob/master/packages/ui/src/symbol/en.ts), [DE](https://github.com/entrecode/ec.components/blob/master/packages/ui/src/symbol/de.ts)