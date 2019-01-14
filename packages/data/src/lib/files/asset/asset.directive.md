# ecAsset

This directive can be used to load a single asset directly from the template:

```html
<ul ecAsset="f663ba74-d33b-499f-a37c-9a5b4cf94543" #myAsset="ecAsset">
  <li>id: {{myAsset.asset?.assetID}}</li>
  <li>title: {{myAsset.asset?.title}}</li>
  <li>tags: {{myAsset.asset?.tags}}</li>
  <li>created: {{myAsset.asset?.created}}</li>
  <li>type: {{myAsset.asset?.type}}</li>
  <li>files: {{myAsset.asset?.files?.length}}</li>
</ul>
```
