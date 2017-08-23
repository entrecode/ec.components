# Introduction
This is the Tutorial for ec.components.
It will take a look at all the major concepts in a didactic order.
HINT: if you are looking for more information than this tutorial, have a look at the tests or the
[Demos](https://components.entrecode.de/)!

<!--  <strike>TODO: When the first version is ready, extend the doc npm task:
compodoc -p tsconfig.json --includes tutorial --includesName Tutorial</strike>  -->

# Core Classes

The core classes, which lay inside the core package are the abstract base for all components.
They are typescript only, without using any angular or datamanager code.
Instead of EventEmitters there the Observables are served via RxJS subjects.

## Installation

```sh
npm i @ec.components/core
```