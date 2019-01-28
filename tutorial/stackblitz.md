# Stackblitz Demos

- [Create Angular Stackblitz](https://stackblitz.com/fork/angular)
- import styles to index.html:

```html
<link rel="stylesheet" href="https://icons.entrecode.de/ec-icons-4.0.1.min.css" />
<link href="https://unpkg.com/@ec.components/style@latest/default.css" rel="stylesheet"/>
```

- Add @ec.components package(s):

```json
"@ec.components/calendar": "^0.2.6",
/** any other components module */
```

- import module(s):

```ts
import { CalendarModule } from '@ec.components/calendar';
@NgModule({
  imports:      [ /* .. */ CalendarModule ],
  /* ... */
})
export class AppModule { }
```

- use component(s) in app.component.html:

```html
<ec-calendar></ec-calendar>
```
