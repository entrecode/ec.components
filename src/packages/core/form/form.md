# Form

[Form](../../classes/Form.html) is an Item with extra functions:
- instantiates fields to iterate over
- getters for fields and property values, including prefills.

```ts
const tommy = new Form({ name: 'tommy' }); //init without config
tommy.getValue('name')); //'tommy'
const bobby = new Form(null, { fields: { name: { prefill:'bobby' }}}); //init with config only
tommy.getValue('name')); //'bobby'
```
