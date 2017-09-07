# Pagination

[Pagination](../../classes/Pagination.html) can be used to keep track of the pages of arbitrary items.

```ts
const pagination = new Pagination({ size: 10 });
pagination.setTotal(50); //tells the pagination that it should paginate over 50 items.
pagination.getPages(); //5
```
See list.ts/list.component for example usage.