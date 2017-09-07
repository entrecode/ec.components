# EC VC

Hello. ecvc is a modular wysiwyg+ editor. It is currently in early development phase.

# contenteditable special behaviour

## A: Simple Text Paragraph

```js
{
  "type": "paragraph",
  "content": [
    "paragraph with text"
  ]
}
```

```html
<p data-ec-id="9eb5f3f9-24d0-4974-89bf-a526c87fe727">
	<span data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		paragraph with text<!-- caret position A before pressing return -->
	</span>
</p>
```
### after pressing return

default behaviour

```html
<p data-ec-id="9eb5f3f9-24d0-4974-89bf-a526c87fe727">
	<span data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		first line B<!-- caret position A before pressing return -->
	</span>
	<div> <!-- gets created when pressing return -->
		<span data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
			<br> <!-- caret position B after pressing return -->
			second line <!-- text gets inserted in place of <br> -->
		</span>
	</div>
</p>
```
expected behaviour

A1/2


```html
<p data-ec-id="9eb5f3f9-24d0-4974-89bf-a526c87fe727">
	<span data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
	first line B<!-- caret position A before pressing return -->
	<br>
	second line <!-- text gets inserted in place of <br> -->
	</span>
</p>
```

A3

```html
<p data-ec-id="9eb5f3f9-24d0-4974-89bf-a526c87fe727">
	<span data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		first line B<!-- caret position A before pressing return -->
	</span>
	<br> <!-- gets created when pressing return -->
	<span data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		second line <!-- text gets inserted in place of <br> -->
	</span>
</p>
```

A4

```html
<p data-ec-id="9eb5f3f9-24d0-4974-89bf-a526c87fe727">
	<span data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		first line B<!-- caret position A before pressing return -->
	</span>
</p>
<p data-ec-id="9eb5f3f9-24d0-4974-89bf-a526c87fe727">
	<span data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		second line <!-- text gets inserted in place of <br> -->
	</span>
</p>
```

###possible json outputs

A1

```js
{
  "type": "paragraph",
  "content": [
    "paragraph with text\nnext line"
  ]
}
```
=> \n needs to be rendered as br

A2

```js
{
  "type": "paragraph",
  "content": [
    "paragraph with text",
    "next line",
  ]
}
```
A3

```js
{
  "type": "paragraph",
  "content": [
    "paragraph with text",
    {type: "break"},
    "next line"
  ]
}
```

A4

```js
[{
  "type": "paragraph",
  "content": [
    "paragraph with text"
  ]
},
{
  "type": "paragraph",
  "content": [
    "second line"
  ]
}]
```

## B: Paragraph with strong

```json
{
  "type": "paragraph",
  "content": [
    {
      "type": "strong",
      "content": "paragraph with strong"
    }
  ]
}
```

```html
<p data-ec-id="9eb5f3f9-24d0-4974-89bf-a526c87fe727">
	<strong data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		first line B<!-- caret position A before pressing return -->
	</strong>
</p>
```

### after pressing return

default behaviour

```html
<p data-ec-id="9eb5f3f9-24d0-4974-89bf-a526c87fe727">
	<strong data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		first line B<!-- caret position A before pressing return -->
	</strong>
	<div> <!-- gets created when pressing return -->
		<strong data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
			<br> <!-- caret position B after pressing return -->
			second line <!-- text gets inserted in place of <br> -->
		</strong>
	</div>
</p>
```


expected behaviour


```html
<p data-ec-id="9eb5f3f9-24d0-4974-89bf-a526c87fe727">
	<strong data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		first line B<!-- caret position A before pressing return -->
	</strong>
	<br>
	<!-- gets created when pressing return -->
	<strong data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		<!-- caret position B after pressing return -->
	</strong>
	</div>
</p>
```

or

```html
<p data-ec-id="9eb5f3f9-24d0-4974-89bf-a526c87fe727">
	<strong data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		first line B<!-- caret position A before pressing return -->
	<br>
	<!-- caret position B after pressing return -->
	</strong>
	</div>
</p>
```

#### possible json outputs

B1

```json
  {
    "type": "paragraph",
    "content": [
      {
        "type": "strong",
        "content": "paragraph with strong\n"
      }
    ]
  }
```

B2

```json
  {
    "type": "paragraph",
    "content": [
      {
        "type": "strong",
        "content": "paragraph with strong"
      },
      {
        "type": "strong",
        "content": "paragraph with strong"
      }
    ]
  }
```

B3

```json
  [{
    "type": "paragraph",
    "content": [
      {
        "type": "strong",
        "content": "paragraph with strong"
      },
      {
        "type": "strong",
        "content": "paragraph with strong"
      }
    ]
  }]
```


##### default beaviour

```html
<p data-ec-id="9eb5f3f9-24d0-4974-89bf-a526c87fe727">
	<strong data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		first line B<!-- caret position A before pressing return -->
	</span>
	<div> <!-- gets created when pressing return -->
		<span data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
			<br> <!-- caret position B after pressing return -->
			second line <!-- text gets inserted in place of <br> -->
		</span>
	</div>
</p>
```

### default behaviour

### possible custom behaviours

- Copy current flow element

```html
<p data-ec-id="9eb5f3f9-24d0-4974-89bf-a526c87fe727">
	<span data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		first line <!-- caret position A before pressing return -->
	</span>
</p>
<!-- either without span -->
	<p data-ec-id="14949d7c-336e-4f0a-bb76-6816bf2471e2">
		<!-- caret position B after pressing return -->
	</p>
<!-- or with span -->
	<p data-ec-id="14949d7c-336e-4f0a-bb76-6816bf2471e2">
		<span data-ec-id="97b27974-db97-47ef-9b98-27aa07c44a65">
		<!-- caret position C after pressing return -->
		</span>
	</p>
```
- or insert break

```html
<p data-ec-id="9eb5f3f9-24d0-4974-89bf-a526c87fe727">
	<span data-ec-id="06bd9d87-d63d-4b6b-ae79-8ace0fd13518">
		parent...? <!-- caret position A before pressing return -->
	</span>
	<br>
	<span data-ec-id="97b27974-db97-47ef-9b98-27aa07c44a65">
	<!-- caret position B after pressing return -->
	</span>
</p>
```

How to handle the br element?

# Developer Notes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
