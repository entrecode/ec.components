# @ec.components/medium-editor

This package wraps the [medium-editor](https://github.com/yabwe/medium-editor) as an Angular Directive.

## Installation

1. Install package

```sh
npm install @ec.components/medium-editor --save
```

2. Add Module

```js
import { MediumModule } from '@ec.components/medium-editor';

@NgModule({
  imports: [
    MediumModule
  ]
})
export class AppModule {
}
```

3. Add Styles

```
@import '~@ec.components/medium-editor/style.scss'
```

4. Use it

```html
 <div ecMediumEditor [(model)]="myHTML"
         [options]="{'toolbar': {'buttons': ['bold', 'italic', 'underline', 'h1', 'h2', 'h3']}}"></div>
```