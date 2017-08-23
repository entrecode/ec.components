# Collection

[Collection](../../classes/Collection.html) is a more sophisticated Array:

```ts
const collection = new Collection([1, 2, 3]);
collection.has(1); //true
collection.has(4); //false
collection.add(4);
collection.remove(4);
collection.index(1); //0
collection.addAll([10,11,12]); //true
collection.hasAll([1,10,11]); //true
collection.removeAll();
```

It is the Parent Class of List and Selection.
