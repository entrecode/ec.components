---
title: Nested Fields
author: felixroos
authorURL: https://github.com/felixroos
authorImageURL: https://avatars2.githubusercontent.com/u/12023032?s=460&v=4
---

`@ec.components/ui#0.47` comes with a new handy nested fields feature, that was originally implemented for config fields in the editor.

BREAKING CHANGE: all fields manually set to `immutable: true` now also have to be set to `disabled: true`. This change was necessary to seperate concerns:

- nested fields need to be deleted from the object that is emitted by the form when saving (`immutable: true`), but be editable at the same time (`disabled: false`)
- before this version `immutable: true` was also disabling the fields.

The following text can now also be found in the form docs:

## How to use Nested Fields

In some cases, you might want to control values that are not a direct property of your target object. Imagine an API expecting this:

```json
{
  "title": "Example Title",
  "config": {
    "useVanillaSauce": true,
    "secrets": {
      "fridgePassword": "ilikedampfnudels"
    }
  }
}
```

If you want to add inputs to control the nested properties "useVanillaSauce" and "fridgePassword", you can do that:

<!--truncate-->

```js
{
  fields: {
    title: {
      inputView: 'string'
    },
    'config_useVanillaSauce': {
      label: 'Use Vanilla Sauce',
      immutable: true,
      inputView: 'toggle',
      resolve: (body, item) => item.resolvePath('config.useVanillaSauce'),
      changed: (value, form) => form.patchObjectField('config', 'useVanillaSauce', value)
    },
    'config_fridgePassword': {
      label:'Fridge Password',
      immutable: true,
      inputView:'password',
      resolve: (body, item) => item.resolvePath('config.secrets.useVanillaSauce'),
      changed: (value, form) => form.patchObjectField('config', 'secrets.fridgePassword', value)
    }
  }
}
```

The immutable flags will tell the form to ignore the field value, so we can handle it ourselfes.
On every change, we patch the value of the config with the updated value.

- The helper function resolvePath returns the given path on the item body, if existing. This function is a handy helper to handle deep objects.
- The helper function patchObjectField is similar to resolvePath, but writes to the given path on the control of the field (calls patchValue)

## Implementation

Here are the implementation details:

### resolvePath

```ts
/** Resolves the given path on the item object. e.g. "value.config.usePassword" will resolve that object path, if existing. */
/* inside Item class */
resolvePath(path: string) {
  return getPath(this.body, path);
}
/* */
/** Resolves the given string path recursively */
function getPath(o, path) {
  const p = path.split('.');
  return p.length === 1 ? (o || {})[p[0]] : getPath((o || {})[p[0]], p.slice(1).join('.'));
}
```

example use:

```ts
test('getPath', () => {
  expect(getPath({ foo: true }, 'foo')).toEqual(true);
  expect(getPath({ foo: { bar: true } }, 'foo.bar')).toEqual(true);
  expect(getPath({ foo: { bar: { foo2: true } } }, 'foo.bar.foo2')).toEqual(true);
  expect(getPath({ foo: { bar: { foo2: true } } }, 'foo.bar')).toEqual({ foo2: true });
  expect(getPath({ foo: { bar: { foo2: true } } }, 'foo.bar.some.undefined.path')).toEqual(undefined);
});
```

### patchObjectField

```ts
/* Inside FormComponent class */
patchObjectField(property, path, value) {
  const control = this.group.get(property);
  control.patchValue(patchObject(control.value, path, value));
}
/* patchObject returns a new object with the given string path modified to the given value. the original object is not modified (immutability) */
function patchObject(o, path, value) {
  const p = path.split('.');
  if (p.length === 1) {
    return {
      ...(o || {}),
      [p[0]]: value,
    };
  }
  return {
    ...(o || {}),
    [p[0]]: patchObject((o || {})[p[0]], p.slice(1).join('.'), value),
  };
}
```

example usage

```ts
test('patchObject', () => {
  expect(patchObject({}, 'foo', true)).toEqual({ foo: true });
  expect(patchObject({}, 'foo.bar', true)).toEqual({ foo: { bar: true } });
  expect(patchObject({ a: true, b: false }, 'b', true)).toEqual({ a: true, b: true });
  expect(patchObject({ a: true, b: { c: true } }, 'b.d', true)).toEqual({ a: true, b: { c: true, d: true } });
  expect(patchObject({ a: true, b: { c: true, d: false } }, 'b.d', true)).toEqual({ a: true, b: { c: true, d: true } });
});
```
